// import React, { useState } from "react";
// import instance from "../axiosConfig";
// import { PiCurrencyInrLight } from "react-icons/pi";
// import { MdDeleteOutline } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { useCart } from "../contexts/CartProvider";

// const Cart = () => {
//   const { cartItems, setCartItems } = useCart();

//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [couponError, setCouponError] = useState("");

//   /* =========================
//      UPDATE QUANTITY
//   ========================= */
//   async function updateQty(productId, action) {
//     try {
//       const res = await instance.patch(
//         `/cart/update/${productId}`,
//         { action },
//         { withCredentials: true }
//       );

//       // backend returns full cart
//       setCartItems(res.data.products);
//     } catch (error) {
//       console.error("Failed to update quantity", error);
//     }
//   }

//   /* =========================
//      REMOVE ITEM
//   ========================= */
//   async function removeItem(productId) {
//     try {
//       const res = await instance.delete(`/cart/${productId}`, {
//         withCredentials: true,
//       });

//       setCartItems(res.data.products);
//     } catch (error) {
//       console.error("Failed to remove item", error);
//     }
//   }

//   /* =========================
//      TOTALS
//   ========================= */
//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.productId.originalPrice * item.quantity,
//     0
//   );

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   /* =========================
//      APPLY COUPON
//   ========================= */
//   async function applyCoupon() {
//     try {
//       setCouponError("");

//       const res = await instance.post(
//         "/coupon/apply",
//         {
//           code: couponCode.trim().toUpperCase(),
//           cartTotal: totalPrice,
//         },
//         { withCredentials: true }
//       );

//       setDiscount(res.data.discountAmount);
//       setFinalPrice(res.data.finalPrice);
//     } catch (error) {
//       setDiscount(0);
//       setFinalPrice(0);
//       setCouponError(error.response?.data?.message || "Invalid coupon");
//     }
//   }

//   /* =========================
//      EMPTY CART
//   ========================= */
//   if (cartItems.length === 0) {
//     return (
//       <section className="cart-page">
//         <p className="cart-empty">
//           Your cart is empty. <Link to="/">Continue shopping</Link>
//         </p>
//       </section>
//     );
//   }

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <section className="cart-page">
//       <div className="cart-container">
//         <h1 className="cart-title">Your Cart</h1>

//         <div className="cart-layout">
//           {/* ================= CART ITEMS ================= */}
//           <div className="cart-items">
//             {cartItems.map((item) => (
//               <div className="cart-item" key={item.productId._id}>
//                 {/* <img
//                   src={`${import.meta.env.VITE_BASEURL}/uploads/${
//                     item.productId.images?.[0] || item.productId.image || ""
//                   }`}
//                   alt={item.productId.name}
//                 /> */}
//                 <img
//                   src={
//                     item.productId.images && item.productId.images.length > 0
//                       ? item.productId.images[0] // ✅ Cloudinary URL
//                       : "/no-image.png"
//                   }
//                   alt={item.productId.name}
//                 />

//                 <div className="cart-item-info">
//                   <h2>{item.productId.name}</h2>

//                   <div className="qty-controls">
//                     <button
//                       onClick={() => updateQty(item.productId._id, "dec")}
//                     >
//                       −
//                     </button>

//                     <span>{item.quantity}</span>

//                     <button
//                       onClick={() => updateQty(item.productId._id, "inc")}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <div className="cart-item-price">
//                   <PiCurrencyInrLight />
//                   {item.productId.originalPrice * item.quantity}
//                 </div>

//                 <button onClick={() => removeItem(item.productId._id)}>
//                   <MdDeleteOutline size={22} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* ================= SUMMARY ================= */}
//           <div className="cart-summary">
//             <h2>Order Summary</h2>

//             <div className="summary-row">
//               <span>Total Items</span>
//               <span>{totalItems}</span>
//             </div>

//             <div className="summary-row">
//               <span>Subtotal</span>
//               <span>
//                 <PiCurrencyInrLight /> {totalPrice}
//               </span>
//             </div>

//             {/* COUPON */}
//             <div className="coupon-box">
//               <input
//                 type="text"
//                 placeholder="Enter coupon code"
//                 value={couponCode}
//                 onChange={(e) => setCouponCode(e.target.value)}
//               />
//               <button onClick={applyCoupon}>Apply</button>
//               {couponError && <p className="error">{couponError}</p>}
//             </div>

//             {discount > 0 && (
//               <>
//                 <div className="summary-row">
//                   <span>Discount</span>
//                   <span>- ₹{discount}</span>
//                 </div>

//                 <div className="summary-total">
//                   <span>Final Price</span>
//                   <span>
//                     <PiCurrencyInrLight /> {finalPrice}
//                   </span>
//                 </div>
//               </>
//             )}

//             <button className="checkout-btn">Proceed to Checkout</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

import React, { useState } from "react";
import instance from "../axiosConfig";
import { PiCurrencyInrLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

const Cart = () => {
  const { cartItems, setCartItems } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [couponError, setCouponError] = useState("");

  /* =========================
     UPDATE QUANTITY
  ========================= */
  async function updateQty(productId, action) {
    try {
      const res = await instance.patch(
        `/cart/update/${productId}`,
        { action },
        { withCredentials: true }
      );
      setCartItems(res.data.products);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  }

  /* =========================
     REMOVE ITEM
  ========================= */
  async function removeItem(productId) {
    try {
      const res = await instance.delete(`/cart/${productId}`, {
        withCredentials: true,
      });
      setCartItems(res.data.products);
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  }

  /* =========================
     FILTER INVALID ITEMS
     (product deleted / null)
  ========================= */
  const validCartItems = cartItems.filter(
    (item) => item.productId && item.productId.originalPrice
  );

  /* =========================
     TOTALS (SAFE)
  ========================= */
  const totalPrice = validCartItems.reduce(
    (acc, item) => acc + item.productId.originalPrice * item.quantity,
    0
  );

  const totalItems = validCartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  /* =========================
     APPLY COUPON
  ========================= */
  async function applyCoupon() {
    try {
      setCouponError("");

      const res = await instance.post(
        "/coupon/apply",
        {
          code: couponCode.trim().toUpperCase(),
          cartTotal: totalPrice,
        },
        { withCredentials: true }
      );

      setDiscount(res.data.discountAmount);
      setFinalPrice(res.data.finalPrice);
    } catch (error) {
      setDiscount(0);
      setFinalPrice(0);
      setCouponError(error.response?.data?.message || "Invalid coupon");
    }
  }

  /* =========================
     EMPTY CART
  ========================= */
  if (validCartItems.length === 0) {
    return (
      <section className="cart-page">
        <p className="cart-empty">
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </p>
      </section>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <section className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-layout">
          {/* ================= CART ITEMS ================= */}
          <div className="cart-items">
            {validCartItems.map((item) => {
              const img = item.productId.images?.[0];
              let imageUrl = "/no-image.png";

              if (img) {
                if (img.startsWith("http")) {
                  imageUrl = img; // Cloudinary
                } else {
                  imageUrl = `${import.meta.env.VITE_BASEURL}/uploads/${img}`; // old uploads
                }
              }

              return (
                <div className="cart-item" key={item.productId._id}>
                  <img src={imageUrl} alt={item.productId.name} />

                  <div className="cart-item-info">
                    <h2>{item.productId.name}</h2>

                    <div className="qty-controls">
                      <button
                        onClick={() => updateQty(item.productId._id, "dec")}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => updateQty(item.productId._id, "inc")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price">
                    <PiCurrencyInrLight />
                    {item.productId.originalPrice * item.quantity}
                  </div>

                  <button onClick={() => removeItem(item.productId._id)}>
                    <MdDeleteOutline size={22} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>
                <PiCurrencyInrLight /> {totalPrice}
              </span>
            </div>

            {/* COUPON */}
            <div className="coupon-box">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={applyCoupon}>Apply</button>
              {couponError && <p className="error">{couponError}</p>}
            </div>

            {discount > 0 && (
              <>
                <div className="summary-row">
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>

                <div className="summary-total">
                  <span>Final Price</span>
                  <span>
                    <PiCurrencyInrLight /> {finalPrice}
                  </span>
                </div>
              </>
            )}

            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
