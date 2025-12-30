// import React, { useEffect, useState } from "react";
// import instance from "../axiosConfig";
// import { PiCurrencyInrLight } from "react-icons/pi";
// import { MdDeleteOutline } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { useCart } from "../contexts/CartProvider";

// const Cart = () => {
//   const { cartItems, setCartItems } = useCart();
//   const [loading, setLoading] = useState(true);

//   async function getCart() {
//     try {
//       const res = await instance.get("/cart/");
//       setCartItems(Array.isArray(res.data) ? res.data : []);
//     } catch (error) {
//       console.error(error);
//       setCartItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getCart();
//   }, []);

//   // ➕ Increase quantity (UI only)
//   function increaseQty(id) {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   }

//   // ➖ Decrease quantity (UI only)
//   function decreaseQty(id) {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   }

//   // 🗑️ Remove item
//   async function removeItem(id) {
//     try {
//       // 👉 Enable if backend supports delete
//       // await instance.delete(`/cart/${id}`);

//       setCartItems((prev) => prev.filter((item) => item._id !== id));
//     } catch (error) {
//       console.error("Failed to remove item", error);
//     }
//   }

//   if (loading) return <p className="cart-loading">Loading cart...</p>;

//   if (!Array.isArray(cartItems)) {
//     return <p className="cart-error">Invalid cart data</p>;
//   }

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.productId.originalPrice * item.quantity,
//     0
//   );

//   return (
//     <section className="cart-page">
//       <div className="cart-container">
//         <h1 className="cart-title">Your Cart</h1>

//         {cartItems.length === 0 ? (
//           <p className="cart-empty">
//             Your cart is empty. <Link to="/">Continue shopping</Link>
//           </p>
//         ) : (
//           <div className="cart-layout">
//             {/* Cart Items */}
//             <div className="cart-items">
//               {cartItems.map((item) => (
//                 <div className="cart-item" key={item._id}>
//                   <img
//                     src={`${import.meta.env.VITE_BASEURL}/${
//                       item.productId.image
//                     }`}
//                     alt={item.productId.name}
//                   />

//                   <div className="cart-item-info">
//                     <h2>{item.productId.name}</h2>

//                     <div className="qty-controls">
//                       <button
//                         className="qty-btn"
//                         onClick={() => decreaseQty(item._id)}
//                       >
//                         −
//                       </button>

//                       <span className="qty-value">{item.quantity}</span>

//                       <button
//                         className="qty-btn"
//                         onClick={() => increaseQty(item._id)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="cart-item-price">
//                     <PiCurrencyInrLight />
//                     {item.productId.originalPrice}
//                   </div>

//                   {/* 🗑️ Delete Icon */}
//                   <button
//                     className="delete-btn"
//                     onClick={() => removeItem(item._id)}
//                     title="Remove item"
//                   >
//                     <MdDeleteOutline size={22} />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Summary */}
//             <div className="cart-summary">
//               <h2>Order Summary</h2>

//               <div className="summary-row">
//                 <span>Total Items</span>
//                 <span>{cartItems.length}</span>
//               </div>

//               <div className="summary-total">
//                 <span>Total Price</span>
//                 <span>
//                   <PiCurrencyInrLight /> {totalPrice}
//                 </span>
//               </div>

//               <button className="checkout-btn">Proceed to Checkout</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { PiCurrencyInrLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const [loading, setLoading] = useState(true);

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

  // ➕ Increase quantity (UI only)
  function increaseQty(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  // ➖ Decrease quantity (UI only)
  function decreaseQty(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  // 🗑️ Remove item (UI only)
  function removeItem(id) {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  }

  if (loading) return <p className="cart-loading">Loading cart...</p>;

  if (!Array.isArray(cartItems)) {
    return <p className="cart-error">Invalid cart data</p>;
  }

  // ✅ SAFE total price
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
            {/* Cart Items */}
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
                          onClick={() => decreaseQty(item._id)}
                        >
                          −
                        </button>

                        <span className="qty-value">{item.quantity}</span>

                        <button
                          className="qty-btn"
                          onClick={() => increaseQty(item._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price">
                      <PiCurrencyInrLight />
                      {item.productId.originalPrice}
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => removeItem(item._id)}
                    >
                      <MdDeleteOutline size={22} />
                    </button>
                  </div>
                ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Total Items</span>
                <span>{cartItems.length}</span>
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
