import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import instance from "../axiosConfig.js";

function AdminHeader() {
  const navigate = useNavigate();

  async function logout() {
    await instance.post("/admin/logout", {}, { withCredentials: true });
    navigate("/admin/login");
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

        <button onClick={logout} className="icon">
          <IoMdLogOut /> Logout
        </button>
      </nav>
    </header>
  );
}

export default AdminHeader;
