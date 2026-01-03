import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig.js";
import { toast } from "react-toastify";

function AdminLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await instance.post("/admin/login", data, {
        withCredentials: true,
      });

      toast.success("Admin login successful");

      navigate("/admin/home");
    } catch (error) {
      console.error("Admin login error", error);
      toast.error(
        error.response?.data?.message || "Invalid admin email or password"
      );
    }
  }

  return (
    <div className="admin-login">
      <h2>Login To your Admin Account</h2>

      <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
