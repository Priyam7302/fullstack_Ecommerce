// import React, { useEffect, useState } from "react";
// import instance from "../axiosConfig";
// import { PiCurrencyInrLight } from "react-icons/pi";
// import { Link } from "react-router-dom";
// import { useCart } from "../contexts/CartProvider";

// const Cart = () => {
//   const { cartItems, setCartItems } = useCart();
//   const [loading, setLoading] = useState(true);

//   // Fetch cart from backend
//   async function getCart() {
//     try {
//       console.log("first")
//       const res = await instance.get("/cart/");
//       console.log("first");
//       console.log(res.data);
//       setCartItems(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   }

//   //  Remove item
//   // async function removeItem(id) {
//   //   try {
//   //     await instance.delete(`/cart/${id}`);
//   //     setCartItems(cartItems.filter((item) => item._id !== id));
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // }

//   useEffect(() => {
//     getCart();
//   },[]);

//   // const totalPrice = cartItems.reduce(
//   //   (acc, item) => acc + item.price * item.quantity,
//   //   0
//   // );
//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.productId.originalPrice * item.quantity,
//     0
//   );


//   if (loading) return <p className="p-10">Loading cart...</p>;

//   return (
//     <section className="min-h-screen bg-[#fafafa] py-16 px-6">
//       <div className="mx-auto max-w-6xl">

//         {/* Heading */}
//         <h1 className="text-3xl font-medium mb-10 text-gray-900">
//           Your Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           <p className="text-gray-500">
//             Your cart is empty.{" "}
//             <Link to="/" className="underline">
//               <span> Continue shopping</span>
//             </Link>
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

//             {/* Cart Items */}
//             <div className="lg:col-span-2 flex flex-col gap-8">
//               {cartItems.map((item) => (
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-xl p-6 shadow-sm flex gap-6"
//                 >
//                   {/* Image */}
//                   <img
//                     src={`http://localhost:3000/${item.productId.image}`}
//                     alt={item.name}
//                     className="w-28 h-28 object-contain"
//                   />

//                   {/* Info */}
//                   <div className="flex flex-col gap-2">
//                     <h2 className="text-lg font-medium">
//                       {item.productId.name}
//                     </h2>

//                     <span className="text-sm text-gray-400">
//                       Qty: {item.quantity}
//                     </span>

                   

//                     {/* <button
//                       onClick={() => removeItem(item._id)}
//                       className="text-sm text-red-500 mt-2 w-fit"
//                     >
//                       Remove
//                     </button> */}
//                   </div>
//                    <div className="flex items-center gap-2 text-base font-medium">
//                       <PiCurrencyInrLight />
                      
//                       {item.productId.originalPrice}
//                     </div>
//                 </div>
//               ))}
//             </div>

//             {/* Summary */}
//             <div className="bg-white rounded-xl p-8 shadow-sm h-fit">
//               <h2 className="text-xl font-medium mb-6">
//                 Order Summary
//               </h2>

//               <div className="flex justify-between mb-4 text-gray-600">
//                 <span>Total Items</span>
//                 <span>{cartItems.length}</span>
//               </div>

//               <div className="flex justify-between text-lg font-semibold mb-6">
//                 <span>Total Price</span>
//                 <span className="flex items-center gap-1">
//                   <PiCurrencyInrLight />
//                   {totalPrice}
//                 </span>
//               </div>

//               <button className="w-full p-4 bg-black text-white text-base font-medium hover:bg-gray-900 transition">
//                 Proceed to Checkout
//               </button>
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
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const [loading, setLoading] = useState(true);

  async function getCart() {
    try {
      const res = await instance.get("/cart/");
      setCartItems(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  // ➕ Increase quantity
  function increaseQty(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  // ➖ Decrease quantity (min 1)
  function decreaseQty(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productId.originalPrice * item.quantity,
    0
  );

  if (loading) return <p className="cart-loading">Loading cart...</p>;

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
              {cartItems.map((item) => (
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
