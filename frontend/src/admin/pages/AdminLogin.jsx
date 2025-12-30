
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig.js";

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
      const response = await instance.post(
        "/admin/login",
        data,
        { withCredentials: true }
      );

      console.log("Login success", response.data);
      alert("login in successfully in Admin");

      navigate("/admin/product/add");
    } catch (error) {
      console.log("login error", error),
        alert("Invelid email or password Admin");
    }
  }

  return (
    <div className="admin-login">
      <h2>Login To your Admin Account</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            placeholder="Enter Your Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">login</button>
        {/* <Link to="/register" className="register">
          Register
        </Link> */}
      </form>
    </div>
  );
}

export default AdminLogin;
