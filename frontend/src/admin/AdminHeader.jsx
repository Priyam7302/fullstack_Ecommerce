import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import instance from "../axiosConfig.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import logo from "../assets/logo1.png";

function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkAdminLogin();
  }, [location.pathname]);

  async function checkAdminLogin() {
    try {
      const res = await instance.get("/check/login?referer=admin", {
        withCredentials: true,
      });
      if (res.status === 200) setIsAdminLoggedIn(true);
    } catch {
      setIsAdminLoggedIn(false);
    }
  }

  async function logout() {
    try {
      await instance.post("/admin/logout", {}, { withCredentials: true });
      toast.success("Admin logged out successfully");
      navigate("/admin/login");
    } catch {
      toast.error("Logout failed");
      navigate("/admin/login");
    }
  }

  return (
    <header className="admin-header">
      {/* LEFT: LOGO */}
      <div className="admin-left">
        <Link to="/admin/home">
          <img src={logo} alt="WearHaus Logo" className="admin-logo" />
        </Link>
      </div>

      {/* RIGHT: HAMBURGER (MOBILE) */}
      <button
        className="admin-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <RxHamburgerMenu />
      </button>

      {/* NAV */}
      <nav className={`admin-nav ${menuOpen ? "open" : ""}`}>
        <Link to="/admin/home" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
        <Link to="/admin/add/product" onClick={() => setMenuOpen(false)}>
          Add Product
        </Link>
        <Link to="/admin/add/coupon" onClick={() => setMenuOpen(false)}>
          Add Coupon
        </Link>
        <Link to="/admin/all/coupon" onClick={() => setMenuOpen(false)}>
          Coupons
        </Link>

        {isAdminLoggedIn ? (
          <button onClick={logout} className="icon">
            <IoMdLogOut /> Logout
          </button>
        ) : (
          <Link to="/admin/login" className="icon">
            <FaUser /> Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default AdminHeader;















// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { IoMdLogOut } from "react-icons/io";
// import { FaUser } from "react-icons/fa";
// import instance from "../axiosConfig.js";
// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";
// import logo from "../assets/logo1.png";

// function AdminHeader() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

//   useEffect(() => {
//     checkAdminLogin();
//   }, [location.pathname]);

//   async function checkAdminLogin() {
//     try {
//       const res = await instance.get("/check/login?referer=admin", {
//         withCredentials: true,
//       });
//       if (res.status === 200) {
//         setIsAdminLoggedIn(true);
//       }
//     } catch {
//       setIsAdminLoggedIn(false);
//     }
//   }

//   async function logout() {
//     try {
//       await instance.post("/admin/logout", {}, { withCredentials: true });
//       toast.success("Admin logged out successfully");
//       setIsAdminLoggedIn(false);
//       navigate("/admin/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//       // Even if logout fails on backend, navigate to login page
//       toast.error("Logout failed, but redirecting...");
//       setIsAdminLoggedIn(false);
//       navigate("/admin/login");
//     }
//   }

//   return (
//     <header className="admin-header">
//       <div className="logo">
//         <Link to="/">
//           <img src={logo} alt="WearHaus Logo" />
//         </Link>
//       </div>

//       <nav className="admin-nav">
//         <Link to="/admin/home">Admin Panel</Link>
//         <Link to="/admin/add/product">Add Product</Link>
//         <Link to="/admin/add/coupon">Add Coupon</Link>
//         <Link to="/admin/all/coupon">Coupons</Link>

//         {isAdminLoggedIn ? (
//           <button onClick={logout} className="icon">
//             <IoMdLogOut /> Logout
//           </button>
//         ) : (
//           <Link to="/admin/login" className="icon">
//             <FaUser /> Login
//           </Link>
//         )}
//       </nav>
//     </header>
//   );
// }

// export default AdminHeader;
