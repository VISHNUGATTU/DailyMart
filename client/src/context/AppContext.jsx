// context/AppContext.js

import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {   
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const currency = import.meta.env.VITE_CURRENCY || '₹';
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const fetchSeller=async()=>{
        try {
            const {data} = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true);
            }else{
                setIsSeller(false);
            }
        } catch (error) {
            console.log(error);
            setIsSeller(false);
        }
    }

    const fetchUser = async () => {
    try {
        const { data } = await axios.get('/api/user/is-auth');
        if (data.success && data.message) {
            setUser(data.message); 
            if (data.message.cartItems) {
                setCartItems(data.message.cartItems);
            }
        } else {
            setUser(false); 
            setCartItems({});
        }
    } catch (error) {
        console.error(error);
        setUser(false);
        setCartItems({});
    }
};


    const logoutUser = async () => {
    try {
        const { data } = await axios.get('/api/user/logout');
        if (data.success) {
            setUser(null);
            setCartItems({});
            toast.success("Logged out successfully");
            navigate('/');
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};


    const fetchProducts = async () => {
    try {
        const { data } = await axios.get('/api/product/list');
        console.log(data);
        if (data.success) {
        setProducts(data.data); 
        } else {
        toast.error("Failed to fetch products");
        }
    } catch (error) {
        toast.error(error.message);
    }
};


    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Item added to cart");
    };

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated successfully");
    };

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
            toast.success("Item removed from cart");
            setCartItems(cartData);
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find(product => product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[itemId];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    useEffect(() => {
        fetchSeller();
        fetchProducts();
        fetchUser();
    }, []);

    useEffect(() => {
        const updateCart = async () => {
            if (!user) return; // ✅ don't sync if logged out
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems });
                if (!data.success) {
                    console.error("Cart update failed:", data.message);
                }
            } catch (error) {
                console.error("Cart update error:", error.message);
            }
        };
        updateCart();
    }, [cartItems, user]);





    const value = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        setCartItems,
        searchQuery,
        setSearchQuery,
        getCartCount,
        getCartAmount,
        axios,
        fetchProducts,
        fetchUser,
        logoutUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
