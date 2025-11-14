'use client'
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();

    const { user } = useUser();
    const { getToken } = useAuth();

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState({});

    // ---------------------------------------------------
    // FETCH PRODUCTS
    // ---------------------------------------------------
    const fetchProductData = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ---------------------------------------------------
    // FETCH USER DATA + CART
    // ---------------------------------------------------
    const fetchUserData = async () => {
        try {
            if (user?.publicMetadata?.role === 'seller') {
                setIsSeller(true);
            }

            const token = await getToken();
            const { data } = await axios.get('/api/user/data', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setUserData(data.user);
                setCartItems(data.user.cartItems || {});
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    // ---------------------------------------------------
    // ADD TO CART
    // ---------------------------------------------------
    const addToCart = async (itemId) => {
        if (!user) {
            return toast('Please login', { icon: '⚠️' });
        }

        let cartData = { ...cartItems };
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        setCartItems(cartData);

        try {
            const token = await getToken();
            await axios.post('/api/cart/update', { cartData }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Item added to cart');
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ---------------------------------------------------
    // UPDATE CART QUANTITY
    // ---------------------------------------------------
    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = { ...cartItems };

        if (quantity <= 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        setCartItems(cartData);

        try {
            const token = await getToken();
            await axios.post('/api/cart/update', { cartData }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Cart Updated');
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ---------------------------------------------------
    // SAFE CART COUNT
    // ---------------------------------------------------
    const getCartCount = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    // ---------------------------------------------------
    // ✅ SAFE CART AMOUNT — NO MORE CRASHES
    // ---------------------------------------------------
    const getCartAmount = () => {
        let total = 0;

        Object.keys(cartItems).forEach((id) => {
            const product = products.find((p) => p._id === id);

            // price is 0 if product missing OR offerPrice missing
            const price = product?.offerPrice ?? 0;

            total += price * (cartItems[id] ?? 0);
        });

        return Math.floor(total * 100) / 100;
    };

    // ---------------------------------------------------
    // LOAD DATA
    // ---------------------------------------------------
    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    return (
        <AppContext.Provider
            value={{
                user, getToken,
                currency, router,
                isSeller, setIsSeller,
                userData, fetchUserData,
                products, fetchProductData,
                cartItems, setCartItems,
                addToCart, updateCartQuantity,
                getCartCount, getCartAmount
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
