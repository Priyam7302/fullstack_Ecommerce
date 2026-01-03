// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
// import { IoMdLogOut } from "react-icons/io";
// import instance from "../axiosConfig.js";
// import { useCart } from "../contexts/CartProvider.jsx";


// function Header() {
//   const { cartItems, setCartItems } = useCart();
//   const navigate = useNavigate();


//   async function logout() {
//     await instance.post("/user/logout");
//     setCartItems([]);
//     navigate("/login");
//   }
  
//   return (
//     <header className="header">
//       <div className="logo">
//         <Link to="/"> Ecommerce</Link>
//       </div>

//       <div className="search-box">
//         <input type="text" placeholder="Search for products..." />
//         <button>
//           <FaSearch />
//         </button>
//       </div>

//       <div className="icons">
//         <Link to="/login" className="icon">
//           <FaUser /> <span>Login</span>
//         </Link>

//         <Link to="/register" className="icon">
//           <FaUser /> <span>Register</span>
//         </Link>

//         <Link to="/admin/login" className="icon">
//           <FaUser /> <span>Admin Login</span>
//         </Link>
//         <Link to="/logout" className="icon">
//           <span onClick={logout}>
//             <IoMdLogOut />
//           </span>
//         </Link>
//         <Link to="/cart" className="icon">
//           <FaShoppingCart /> <span>Cart{cartItems.length }</span>
//         </Link>
//       </div>
//     </header>
//   );
// }

// export default Header;




// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
// import { IoMdLogOut } from "react-icons/io";
// import instance from "../axiosConfig.js";
// import { useCart } from "../contexts/CartProvider.jsx";
// import { useAuth } from "../contexts/AuthProvider.jsx";

// function Header() {
//   const { cartItems, setCartItems } = useCart();
//   const { isUserLoggedIn, logoutUserState } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // 👉 Detect admin routes
//   const isAdminRoute = location.pathname.startsWith("/admin");

//   async function logout() {
//     await instance.post("/user/logout", {}, { withCredentials: true });
//     setCartItems([]);
//     logoutUserState();
//     navigate("/login");
//   }

//   return (
//     <header className="header">
//       <div className="logo">
//         <Link to="/">Ecommerce</Link>
//       </div>

//       <div className="search-box">
//         <input type="text" placeholder="Search for products..." />
//         <button>
//           <FaSearch />
//         </button>
//       </div>

//       <div className="icons">
//         {/* 🚫 NO USER LOGIN ON ADMIN ROUTES */}
//         {!isAdminRoute && !isUserLoggedIn && (
//           <>
//             <Link to="/login" className="icon">
//               <FaUser /> <span>Login</span>
//             </Link>

//             <Link to="/register" className="icon">
//               <FaUser /> <span>Register</span>
//             </Link>
//           </>
//         )}

//         {/* ✅ LOGOUT ONLY WHEN LOGGED IN */}
//         {isUserLoggedIn && (
//           <button onClick={logout} className="icon logout-btn">
//             <IoMdLogOut /> <span>Logout</span>
//           </button>
//         )}

//         {/* 🛒 CART (USER ONLY) */}
//         {!isAdminRoute && (
//           <Link to="/cart" className="icon">
//             <FaShoppingCart />
//             <span>Cart ({cartItems.length})</span>
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Header;
