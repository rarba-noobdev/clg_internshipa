import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        
        // Check if user is authenticated
        if (!userId) {
            return NextResponse.json({ 
                success: false, 
                message: 'Unauthorized. Please login.' 
            }, { status: 401 });
        }

        const { address, items } = await request.json();

        // Validation
        if (!address) {
            return NextResponse.json({ 
                success: false, 
                message: 'Please select a delivery address' 
            }, { status: 400 });
        }

        if (!items || items.length === 0) {
            return NextResponse.json({ 
                success: false, 
                message: 'Cart is empty' 
            }, { status: 400 });
        }

        // CRITICAL FIX: Calculate amount correctly with Promise.all
        // The original reduce with async was broken
        const productPromises = items.map(async (item) => {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product ${item.product} not found`);
            }
            return product.offerPrice * item.quantity;
        });

        const amounts = await Promise.all(productPromises);
        const subtotal = amounts.reduce((sum, amount) => sum + amount, 0);
        const tax = Math.floor(subtotal * 0.02);
        const total = subtotal + tax;

        console.log('Order calculation:', {
            userId,
            itemCount: items.length,
            subtotal,
            tax,
            total
        });

        // Send event to Inngest
        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                address,
                items,
                amount: total,
                date: Date.now()
            }
        });

        // OPTIONAL: Clear user cart in database
        // Uncomment if you want to sync cart to database
        /*
        const user = await User.findOne({ clerkId: userId }); // Use clerkId, not _id
        if (user) {
            user.cartItems = {};
            await user.save();
        }
        */

        return NextResponse.json({ 
            success: true, 
            message: 'Order placed successfully!' 
        }, { status: 200 });

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || 'Failed to place order' 
        }, { status: 500 });
    }
}