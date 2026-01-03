import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { PiCurrencyInrLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";
import Loader from "../components/Loader";

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [couponError, setCouponError] = useState("");

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

  if (loading) return <Loader />;

  const totalPrice = cartItems.reduce((acc, item) => {
    if (!item.productId) return acc;
    return acc + item.productId.originalPrice * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((acc, item) => {
    if (!item.productId) return acc;
    return acc + item.quantity;
  }, 0);

  const applyCoupon = async () => {
    try {
      setCouponError("");
      const res = await instance.post("/coupon/apply", {
        code: couponCode?.toUpperCase().trim(),
        cartTotal: totalPrice,
      });

      setDiscount(res.data.discountAmount);
      setFinalPrice(res.data.finalPrice);
    } catch (error) {
      setDiscount(0);
      setFinalPrice(0);
      setCouponError(error.response?.data?.message || "Coupon invalid");
    }
  };

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
              {cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={`${import.meta.env.VITE_BASEURL}/uploads/${
                      item.productId.images?.[0] || item.productId.image || ""
                    }`}
                    alt={item.productId.name}
                  />

                  <div className="cart-item-info">
                    <h2>{item.productId.name}</h2>

                    <div className="qty-controls">
                      <button onClick={() => updateQty(item._id, "dec")}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, "inc")}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price">
                    <PiCurrencyInrLight />
                    {item.productId.originalPrice * item.quantity}
                  </div>

                  <button onClick={() => removeItem(item._id)}>
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

              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  <PiCurrencyInrLight /> {totalPrice}
                </span>
              </div>

              <div className="coupon-box">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
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
        )}
      </div>
    </section>
  );
};

export default Cart;

// import React, { useEffect, useState } from "react";
// import instance from "../axiosConfig";
// import { PiCurrencyInrLight } from "react-icons/pi";
// import { MdDeleteOutline } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { useCart } from "../contexts/CartProvider";
// import Loader from "../components/Loader";

// const Cart = () => {
//   const { cartItems, setCartItems } = useCart();
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);

//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [couponError, setCouponError] = useState("");

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

//   async function updateQty(id, action) {
//     try {
//       setUpdatingId(id);
//       const res = await instance.patch(`/cart/update/${id}`, { action });
//       setCartItems(res.data);
//     } catch (error) {
//       console.error("Failed to update quantity", error);
//     } finally {
//       setUpdatingId(null);
//     }
//   }

//   async function removeItem(id) {
//     try {
//       const res = await instance.delete(`/cart/delete/${id}`);
//       setCartItems(res.data);
//     } catch (error) {
//       console.error("Failed to delete cart item", error);
//     }
//   }

//   if (loading) return <Loader />;

//   const totalPrice = cartItems.reduce((acc, item) => {
//     if (!item.productId) return acc;
//     return acc + item.productId.originalPrice * item.quantity;
//   }, 0);

//   const totalItems = cartItems.reduce((acc, item) => {
//     if (!item.productId) return acc;
//     return acc + item.quantity;
//   }, 0);

//   const applyCoupon = async () => {
//     try {
//       setCouponError("");
//       const res = await instance.post("/coupon/apply", {
//         code: couponCode,
//         cartTotal: totalPrice,
//       });

//       setDiscount(res.data.discountAmount);
//       setFinalPrice(res.data.finalPrice);
//     } catch (error) {
//       setDiscount(0);
//       setFinalPrice(0);
//       setCouponError(error.response?.data?.message || "Coupon invalid");
//     }
//   };

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
//             <div className="cart-items">
//               {cartItems.map((item) => {
//                 const imageName = item.productId?.images?.length
//                   ? item.productId.images[0]
//                   : item.productId?.image
//                   ? item.productId.image.replace("uploads/", "")
//                   : "";

//                 return (
//                   <div className="cart-item" key={item._id}>
//                     <img
//                       src={
//                         imageName
//                           ? `${
//                               import.meta.env.VITE_BASEURL
//                             }/uploads/${imageName}`
//                           : "/no-image.png"
//                       }
//                       alt={item.productId?.name}
//                     />

//                     <div className="cart-item-info">
//                       <h2>{item.productId?.name}</h2>

//                       <div className="qty-controls">
//                         <button
//                           disabled={updatingId === item._id}
//                           onClick={() => updateQty(item._id, "dec")}
//                         >
//                           −
//                         </button>
//                         <span>{item.quantity}</span>
//                         <button
//                           disabled={updatingId === item._id}
//                           onClick={() => updateQty(item._id, "inc")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>

//                     <div className="cart-item-price">
//                       <PiCurrencyInrLight />
//                       {item.productId.originalPrice * item.quantity}
//                     </div>

//                     <button onClick={() => removeItem(item._id)}>
//                       <MdDeleteOutline size={22} />
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="cart-summary">
//               <h2>Order Summary</h2>

//               <div className="summary-row">
//                 <span>Total Items</span>
//                 <span>{totalItems}</span>
//               </div>

//               <div className="summary-row">
//                 <span>Subtotal</span>
//                 <span>
//                   <PiCurrencyInrLight /> {totalPrice}
//                 </span>
//               </div>

//               <div className="coupon-box">
//                 <input
//                   type="text"
//                   placeholder="Enter coupon code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                 />
//                 <button onClick={applyCoupon}>Apply</button>
//                 {couponError && <p className="error">{couponError}</p>}
//               </div>

//               {discount > 0 && (
//                 <>
//                   <div className="summary-row">
//                     <span>Discount</span>
//                     <span>- ₹{discount}</span>
//                   </div>

//                   <div className="summary-total">
//                     <span>Final Price</span>
//                     <span>
//                       <PiCurrencyInrLight /> {finalPrice}
//                     </span>
//                   </div>
//                 </>
//               )}

//               <button className="checkout-btn">Proceed to Checkout</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Cart;
