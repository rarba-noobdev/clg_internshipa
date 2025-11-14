'use client'
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
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

    const fetchProductData = async () => {
        try {
            console.log('Fetching products...');
            const {data} = await axios.get('/api/product/list')

            if (data.success) {
                console.log(`✅ Loaded ${data.products.length} products`);
                setProducts(data.products)
                setProductsLoaded(true)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error('Error fetching products:', error);
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
                console.log('User data loaded:', {
                    cartItemsCount: Object.keys(data.user.cartItems || {}).length
                });
                setUserData(data.user)
                setCartItems(data.user.cartItems || {})
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
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

    // FIXED: Wait for products to load before calculating
    const getCartAmount = () => {
        // Return 0 if products not loaded yet
        if (!productsLoaded || products.length === 0) {
            console.log('Products not loaded yet, returning 0');
            return 0;
        }

        let totalAmount = 0;
        
        for (const itemId in cartItems) {
            // Only calculate if quantity is positive
            if (cartItems[itemId] > 0) {
                // Find the product
                let itemInfo = products.find((product) => product._id === itemId);
                
                // Check if product exists and has offerPrice
                if (itemInfo && itemInfo.offerPrice !== undefined) {
                    totalAmount += itemInfo.offerPrice * cartItems[itemId];
                } else {
                    console.warn(`⚠️ Product ${itemId} not found in products array`);
                    console.log('Available product IDs:', products.map(p => p._id));
                }
            }
        }
        
        return Math.floor(totalAmount * 100) / 100;
    }

    // Clean up cart - remove products that no longer exist
    const cleanUpCart = async () => {
        if (!user || products.length === 0 || !productsLoaded) return;

        let hasInvalidItems = false;
        let cleanedCart = structuredClone(cartItems);

        for (const itemId in cleanedCart) {
            const product = products.find((p) => p._id === itemId);
            
            if (!product) {
                console.log(`🗑️ Removing invalid product ${itemId} from cart`);
                delete cleanedCart[itemId];
                hasInvalidItems = true;
            }
        }

        // Update cart if invalid items were found
        if (hasInvalidItems) {
            setCartItems(cleanedCart);
            
            try {
                const token = await getToken();
                await axios.post('/api/cart/update', { cartData: cleanedCart }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Cart cleaned up - removed deleted products');
            } catch (error) {
                console.error('Error cleaning cart:', error);
            }
        }
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if (user) {
            fetchUserData()
        }
    }, [user])

    // Auto-cleanup cart when products are loaded
    useEffect(() => {
        if (productsLoaded && Object.keys(cartItems).length > 0) {
            console.log('Checking cart validity...');
            console.log('Cart items:', Object.keys(cartItems));
            console.log('Product IDs:', products.map(p => p._id));
            
            // Check if all cart items exist in products
            const invalidItems = Object.keys(cartItems).filter(itemId => 
                !products.find(p => p._id === itemId)
            );
            
            if (invalidItems.length > 0) {
                console.warn('Invalid items in cart:', invalidItems);
                cleanUpCart();
            } else {
                console.log('✅ All cart items are valid');
            }
        }
    }, [productsLoaded, products])

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
        cleanUpCart
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}