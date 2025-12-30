import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { PiCurrencyInrLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  async function getCart() {
    try {
      const res = await instance.get("/cart/");
      setCartItems(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  
  async function updateQty(id, action) {
    try {
      setUpdatingId(id);
      const res = await instance.patch(`/cart/update/${id}`, { action });
      setCartItems(res.data);
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setUpdatingId(null);
    }
  }

  async function removeItem(id) {
    try {
      const res = await instance.delete(`/cart/delete/${id}`);
      setCartItems(res.data);
    } catch (error) {
      console.error("Failed to delete cart item", error);
    }
  }

  if (loading) return <p className="cart-loading">Loading cart...</p>;

  if (!Array.isArray(cartItems)) {
    return <p className="cart-error">Invalid cart data</p>;
  }


  const totalPrice = cartItems.reduce((acc, item) => {
    if (!item.productId) return acc;
    return acc + item.productId.originalPrice * item.quantity;
  }, 0);

  return (
    <section className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="cart-empty">
            Your cart is empty. <Link to="/">Continue shopping</Link>
          </p>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems
                .filter((item) => item.productId)
                .map((item) => (
                  <div className="cart-item" key={item._id}>
                    <img
                      src={`${import.meta.env.VITE_BASEURL}/${
                        item.productId.image
                      }`}
                      alt={item.productId.name}
                    />

                    <div className="cart-item-info">
                      <h2>{item.productId.name}</h2>

                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          disabled={updatingId === item._id}
                          onClick={() => updateQty(item._id, "dec")}
                        >
                          −
                        </button>

                        <span className="qty-value">{item.quantity}</span>

                        <button
                          className="qty-btn"
                          disabled={updatingId === item._id}
                          onClick={() => updateQty(item._id, "inc")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price">
                      <PiCurrencyInrLight />
                      {item.productId.originalPrice * item.quantity}
                    </div>

                    <button
                      className="delete-btn"
                      disabled={updatingId === item._id}
                      onClick={() => removeItem(item._id)}
                    >
                      <MdDeleteOutline size={22} />
                    </button>
                  </div>
                ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-total">
                <span>Total Price</span>
                <span>
                  <PiCurrencyInrLight /> {totalPrice}
                </span>
              </div>

              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
