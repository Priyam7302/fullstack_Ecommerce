// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import instance from "../../axiosConfig";

// const AllCoupons = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchCoupons = async () => {
//     try {
//       const res = await instance.get("/coupon/all");
//       setCoupons(res.data.coupons);
//     } catch (err) {
//       setError("Failed to fetch coupons");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCoupons();
//   }, []);

//   /* ======================
//      DELETE COUPON
//   ====================== */
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this coupon?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await instance.delete(`/coupon/delete/${id}`);
//       fetchCoupons(); // refresh list
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     }
//   };


//  const navigate = useNavigate();

//  const handleEdit = (coupon) => {
//    navigate(`/admin/coupons/edit/${coupon._id}`);
//  };


// if (loading) return <p className="loading-text">Loading coupon...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="admin-page">
//       <h2>All Coupons</h2>

//       {coupons.length === 0 ? (
//         <p>No coupons found</p>
//       ) : (
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Code</th>
//               <th>Discount (%)</th>
//               <th>Start Date</th>
//               <th>Expiry Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {coupons.map((coupon) => (
//               <tr key={coupon._id}>
//                 <td>{coupon.code}</td>
//                 <td>{coupon.discount}</td>
//                 <td>
//                   {new Date(coupon.startDate).toLocaleDateString()}
//                 </td>
//                 <td>
//                   {new Date(coupon.expiryDate).toLocaleDateString()}
//                 </td>
//                 <td>
//                   <button
//                     className="edit-btn"
//                     onClick={() => handleEdit(coupon)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(coupon._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AllCoupons;
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ======================
     FETCH COUPONS
  ====================== */
  const fetchCoupons = async () => {
    try {
      const res = await instance.get("/coupon/all");
      setCoupons(res.data.coupons);
    } catch (err) {
      setError("Failed to fetch coupons");
      toast.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  /* ======================
     DELETE COUPON
  ====================== */
  const handleDelete = async (id) => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this coupon?</p>
          <div style={{ marginTop: "8px" }}>
            <button
              onClick={async () => {
                try {
                  await instance.delete(`/coupon/delete/${id}`);
                  toast.success("Coupon deleted successfully");
                  fetchCoupons();
                } catch (err) {
                  toast.error(err.response?.data?.message || "Delete failed");
                }
                closeToast();
              }}
              style={{ marginRight: "10px" }}
            >
              Yes
            </button>
            <button onClick={closeToast}>Cancel</button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  /* ======================
     EDIT COUPON
  ====================== */
  const handleEdit = (coupon) => {
    navigate(`/admin/coupons/edit/${coupon._id}`);
  };

  if (loading) return <p className="loading-text">Loading coupon...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-page">
      <h2>All Coupons</h2>

      {coupons.length === 0 ? (
        <p>No coupons found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount (%)</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{coupon.discount}</td>
                <td>{new Date(coupon.startDate).toLocaleDateString()}</td>
                <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(coupon)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllCoupons;
