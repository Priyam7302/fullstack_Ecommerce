import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import instance from "../axiosConfig.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    checkAdminLogin();
  }, [location.pathname]);

  async function checkAdminLogin() {
    try {
      const res = await instance.get("/check/login?referer=admin", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsAdminLoggedIn(true);
      }
    } catch {
      setIsAdminLoggedIn(false);
    }
  }

  async function logout() {
    try {
      await instance.post("/admin/logout", {}, { withCredentials: true });
      toast.success("Admin logged out successfully");
      setIsAdminLoggedIn(false);
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails on backend, navigate to login page
      toast.error("Logout failed, but redirecting...");
      setIsAdminLoggedIn(false);
      navigate("/admin/login");
    }
  }

  return (
    <header className="admin-header">
      <div className="logo">
        <Link to="/admin/home">Admin Panel</Link>
      </div>

      <nav className="admin-nav">
        <Link to="/admin/home">Dashboard</Link>
        <Link to="/admin/add/product">Add Product</Link>
        <Link to="/admin/add/coupon">Add Coupon</Link>
        <Link to="/admin/all/coupon">Coupons</Link>

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
