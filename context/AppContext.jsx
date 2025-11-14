'use client'
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY || '₹'
    const router = useRouter()

    const { user } = useUser()
    const { getToken } = useAuth()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [productsLoaded, setProductsLoaded] = useState(false)
    const hasNormalizedRef = useRef(false) // Prevent multiple normalizations

    const fetchProductData = async () => {
        try {
            console.log('📦 Fetching products...');
            const {data} = await axios.get('/api/product/list')

            if (data.success) {
                console.log(`✅ Loaded ${data.products.length} products`);
                console.log('Product IDs:', data.products.map(p => p._id));
                setProducts(data.products)
                setProductsLoaded(true)
            } else {
                console.error('Failed to load products:', data.message);
                toast.error(data.message)
            }

        } catch (error) {
            console.error('❌ Error fetching products:', error);
            toast.error(error.message)
        }
    }

    const fetchUserData = async () => {
        try {
            if (user?.publicMetadata?.role === 'seller') {
                setIsSeller(true)
            }

            const token = await getToken()

            const { data } = await axios.get('/api/user/data', { 
                headers: { Authorization: `Bearer ${token}` } 
            })

            if (data.success) {
                console.log('👤 User data loaded');
                console.log('Cart from server:', data.user.cartItems);
                setUserData(data.user)
                setCartItems(data.user.cartItems || {})
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error('❌ Error fetching user data:', error);
            toast.error(error.message)
        }
    }

    const addToCart = async (itemId) => {

        if (!user) {
            return toast('Please login',{
                icon: '⚠️',
            })
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        
        if (user) {
            try {
                const token = await getToken()
                await axios.post('/api/cart/update', {cartData}, {
                    headers:{Authorization: `Bearer ${token}`}
                })
                toast.success('Item added to cart')
            } catch (error) {
                console.error('Error updating cart:', error);
                toast.error(error.message)
            }
        }
    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
        
        if (user) {
            try {
                const token = await getToken()
                await axios.post('/api/cart/update', {cartData}, {
                    headers:{Authorization: `Bearer ${token}`}
                })
                toast.success('Cart Updated')
            } catch (error) {
                console.error('Error updating cart quantity:', error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        if (!productsLoaded || products.length === 0) {
            return 0;
        }

        let totalAmount = 0;
        
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                // Convert both to strings for comparison
                let itemInfo = products.find((product) => String(product._id) === String(itemId));
                
                if (itemInfo && itemInfo.offerPrice !== undefined) {
                    totalAmount += itemInfo.offerPrice * cartItems[itemId];
                } else {
                    console.warn(`⚠️ Product ${itemId} not found`);
                }
            }
        }
        
        return Math.floor(totalAmount * 100) / 100;
    }

    // Clean invalid cart items
    const cleanCart = async () => {
        if (!productsLoaded || !user || Object.keys(cartItems).length === 0) {
            return;
        }

        console.log('🧹 Cleaning cart...');
        console.log('Cart items:', Object.keys(cartItems));
        console.log('Product IDs:', products.map(p => String(p._id)));

        const productIdStrings = products.map(p => String(p._id));
        const cleanedCart = {};
        let removedCount = 0;

        for (const itemId in cartItems) {
            const itemIdStr = String(itemId);
            
            if (productIdStrings.includes(itemIdStr)) {
                cleanedCart[itemIdStr] = cartItems[itemId];
                console.log(`✓ Kept: ${itemIdStr}`);
            } else {
                console.log(`✗ Removed: ${itemId} (not in products)`);
                removedCount++;
            }
        }

        if (removedCount > 0) {
            console.log(`Removed ${removedCount} invalid items`);
            setCartItems(cleanedCart);

            try {
                const token = await getToken();
                await axios.post('/api/cart/update', { cartData: cleanedCart }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success(`Cart cleaned: removed ${removedCount} invalid items`);
            } catch (error) {
                console.error('Failed to save cleaned cart:', error);
            }
        } else {
            console.log('✅ Cart is clean');
        }
    }

    // Fetch products on mount
    useEffect(() => {
        fetchProductData()
    }, [])

    // Fetch user data when user logs in
    useEffect(() => {
        if (user) {
            fetchUserData()
        }
    }, [user])

    // Validate and clean cart once products and cart are loaded
    useEffect(() => {
        if (productsLoaded && Object.keys(cartItems).length > 0 && !hasNormalizedRef.current) {
            hasNormalizedRef.current = true; // Run only once
            
            console.log('=== CART VALIDATION ===');
            const productIdStrings = products.map(p => String(p._id));
            const cartIdStrings = Object.keys(cartItems).map(id => String(id));
            
            console.log('Cart IDs:', cartIdStrings);
            console.log('Product IDs:', productIdStrings);
            
            // Check for mismatches
            const invalid = cartIdStrings.filter(id => !productIdStrings.includes(id));
            
            if (invalid.length > 0) {
                console.log('⚠️ Invalid items found:', invalid);
                cleanCart();
            } else {
                console.log('✅ All cart items are valid');
            }
            
            console.log('=== END VALIDATION ===\n');
        }
    }, [productsLoaded, cartItems])

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        productsLoaded,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        cleanCart
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}