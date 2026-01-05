import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isUserLoggedIn } = useAuth();

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await instance.get("/cart", {
          withCredentials: true,
        });

        //  backend returns { userId, products: [] }
        setCartItems(res.data?.products || []);
      } catch (error) {
        setCartItems([]);
      }
    }

    if (isUserLoggedIn) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isUserLoggedIn]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
