import React, { useEffect, useMemo, useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import "../adminUi.css";

const AdminHome = () => {

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [sortBy, setSortBy] = useState("");


  async function fetchUsers() {
    try {
      const res = await instance.get("/user", { withCredentials: true });
      setUsers(res.data.users || []);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  }


  async function fetchProducts() {
    try {
      const res = await instance.get("/product", { withCredentials: true });
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);


  const adminUsers = useMemo(
    () => users.filter((u) => u.role === "admin"),
    [users]
  );

  const normalUsers = useMemo(
    () => users.filter((u) => u.role === "user"),
    [users]
  );

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sortBy) {
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return list.sort((a, b) => a.discountedPrice - b.discountedPrice);
      case "price-desc":
        return list.sort((a, b) => b.discountedPrice - a.discountedPrice);
      default:
        return list;
    }
  }, [products, sortBy]);


  return (
    <>
      {(loadingUsers || loadingProducts) && <Loader />}

      {!loadingUsers && !loadingProducts && (
        <div className="admin-page">
          <h2>Admin Dashboard</h2>
          <p>Overview of users and products</p>

       
          <section className="admin-section">
            <h3>Users</h3>

            {/* ADMIN USERS */}
            <div className="admin-card">
              <h4>Admin Users ({adminUsers.length})</h4>

              {adminUsers.length === 0 ? (
                <p>No admin users</p>
              ) : (
                <ul>
                  {adminUsers.map((user) => (
                    <li key={user._id}>
                      <strong>{user.name || "—"}</strong> — {user.email}
                      <span style={{ marginLeft: "10px" }}>🟢 Active</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* NORMAL USERS */}
            <div className="admin-card">
              <h4>Normal Users ({normalUsers.length})</h4>

              {normalUsers.length === 0 ? (
                <p>No normal users</p>
              ) : (
                <ul>
                  {normalUsers.map((user) => (
                    <li key={user._id} style={{ marginBottom: "8px" }}>
                      <strong>{user.name || "—"}</strong> — {user.email}
                      <span style={{ marginLeft: "10px" }}>
                        {user.isBlocked ? "🔴 Blocked" : "🟢 Active"}
                      </span>
                      <button
                        style={{ marginLeft: "10px" }}
                        disabled={loadingUsers}
                        onClick={async () => {
                          try {
                            await instance.patch(
                              `/user/block/${user._id}`,
                              {},
                              { withCredentials: true }
                            );

                            toast.success(
                              user.isBlocked ? "User unblocked" : "User blocked"
                            );

                            fetchUsers();
                          } catch {
                            toast.error("Action failed");
                          }
                        }}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

       
          <section className="admin-section">
            <h3>Products</h3>

            <div className="admin-filters">
              <label>Sort by: </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">None</option>
                <option value="name-asc">Name (A → Z)</option>
                <option value="name-desc">Name (Z → A)</option>
                <option value="price-asc">Price (Low → High)</option>
                <option value="price-desc">Price (High → Low)</option>
              </select>
            </div>

            {sortedProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Original Price</th>
                    <th>Discounted Price</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.originalPrice}</td>
                      <td>₹{product.discountedPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default AdminHome;
