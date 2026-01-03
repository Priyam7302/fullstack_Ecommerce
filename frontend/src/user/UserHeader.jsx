import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";


function UserHeader() {
  const { cartItems, setCartItems } = useCart();
  const { isUserLoggedIn, logoutUserState } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await instance.post("/user/logout", {}, { withCredentials: true });
    setCartItems([]);
    logoutUserState();
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Ecommerce</Link>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search products..." />
        <button>
          <FaSearch />
        </button>
      </div>

      <div className="icons">
        {!isUserLoggedIn && (
          <>
            <Link to="/login" className="icon">
              <FaUser /> Login
            </Link>

            <Link to="/register" className="icon">
              <FaUser /> Register
            </Link>
          </>
        )}

        {isUserLoggedIn && (
          <button onClick={logout} className="icon">
            <IoMdLogOut /> Logout
          </button>
        )}

        <Link to="/cart" className="icon">
          <FaShoppingCart /> Cart ({cartItems.length})
        </Link>
      </div>
    </header>
  );
}

export default UserHeader;
