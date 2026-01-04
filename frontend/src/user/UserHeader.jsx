import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";
import logo from "../assets/logo1.png";
import { useState } from "react";

function UserHeader() {
  const { cartItems, setCartItems } = useCart();
  const { isUserLoggedIn, logoutUserState } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    await instance.post("/user/logout", {}, { withCredentials: true });
    setCartItems([]);
    logoutUserState();
    navigate("/login");
  }

  return (
    <header className="header">
      {/* LEFT: LOGO */}
      <div className="user-left">
        <Link to="/">
          <img src={logo} alt="WearHaus Logo" className="user-logo" />
        </Link>
      </div>

      {/* SEARCH (DESKTOP ONLY) */}
      <div className="search-box">
        <input type="text" placeholder="Search products..." />
        <button>
          <FaSearch />
        </button>
      </div>

      {/* HAMBURGER (MOBILE) */}
      <button className="user-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <RxHamburgerMenu />
      </button>

      {/* NAV */}
      <div className={`icons ${menuOpen ? "open" : ""}`}>
        {!isUserLoggedIn && (
          <>
            <Link
              to="/login"
              className="icon"
              onClick={() => setMenuOpen(false)}
            >
              <FaUser /> Login
            </Link>

            <Link
              to="/register"
              className="icon"
              onClick={() => setMenuOpen(false)}
            >
              <FaUser /> Register
            </Link>
          </>
        )}

        {isUserLoggedIn && (
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="icon"
          >
            <IoMdLogOut /> Logout
          </button>
        )}

        <Link to="/cart" className="icon" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart /> Cart ({cartItems.length})
        </Link>
      </div>
    </header>
  );
}

export default UserHeader;

// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
// import { IoMdLogOut } from "react-icons/io";
// import instance from "../axiosConfig";
// import { useAuth } from "../contexts/AuthProvider";
// import { useCart } from "../contexts/CartProvider";
// import logo from "../assets/logo1.png";

// function UserHeader() {
//   const { cartItems, setCartItems } = useCart();
//   const { isUserLoggedIn, logoutUserState } = useAuth();
//   const navigate = useNavigate();

//   async function logout() {
//     await instance.post("/user/logout", {}, { withCredentials: true });
//     setCartItems([]);
//     logoutUserState();
//     navigate("/login");
//   }

//   return (
//     <header className="header">
//       <div className="logo">
//         <Link to="/">
//           <img src={logo} alt="WearHaus Logo" />
//         </Link>
//       </div>

//       <div className="search-box">
//         <input type="text" placeholder="Search products..." />
//         <button>
//           <FaSearch />
//         </button>
//       </div>

//       <div className="icons">
//         {!isUserLoggedIn && (
//           <>
//             <Link to="/login" className="icon">
//               <FaUser /> Login
//             </Link>

//             <Link to="/register" className="icon">
//               <FaUser /> Register
//             </Link>
//           </>
//         )}

//         {isUserLoggedIn && (
//           <button onClick={logout} className="icon">
//             <IoMdLogOut /> Logout
//           </button>
//         )}

//         <Link to="/cart" className="icon">
//           <FaShoppingCart /> Cart ({cartItems.length})
//         </Link>
//       </div>
//     </header>
//   );
// }

// export default UserHeader;
