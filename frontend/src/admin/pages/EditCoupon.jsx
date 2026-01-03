import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";

const EditCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: "",
    discount: "",
    startDate: "",
    expiryDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  /* ======================
     FETCH COUPON BY ID
  ====================== */
  const fetchCoupon = async () => {
    try {
      const res = await instance.get("/coupon/all");
      const coupon = res.data.coupons.find((c) => c._id === id);

      if (!coupon) {
        setMessage("Coupon not found");
        return;
      }

      setForm({
        code: coupon.code,
        discount: coupon.discount,
        startDate: coupon.startDate.split("T")[0],
        expiryDate: coupon.expiryDate.split("T")[0],
      });
    } catch (error) {
      setMessage("Failed to load coupon");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, []);

  /* ======================
     HANDLE CHANGE
  ====================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ======================
     UPDATE COUPON
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await instance.put(`/coupon/update/${id}`, form);
      navigate("/admin/all/coupon");
    } catch (error) {
      setMessage(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading coupon...</p>;

  return (
    <div className="admin-page">
      <h2>Edit Coupon</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          value={form.code}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount %"
          value={form.discount}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Coupon</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default EditCoupon;
