import { createBrowserRouter, RouterProvider } from "react-router-dom";

import First from "./pages/First.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Cart from "./pages/Cart.jsx";

import AdminLogin from "./admin/pages/AdminLogin.jsx";
import AdminHome from "./admin/pages/AdminHome.jsx";
import AddProduct from "./admin/pages/AddProduct.jsx";
import AddCoupon from "./admin/pages/AddCoupon.jsx";
import AllCoupons from "./admin/pages/AllCoupons.jsx";
import EditCoupon from "./admin/pages/EditCoupon.jsx";

import UserProtectedRoute from "./protectedRoutes/UserProtectedRoute.jsx";
import ProtectedRouters from "./admin/components/ProtectedRouters.jsx";

import AuthProvider from "./contexts/AuthProvider.jsx";
import { CartProvider } from "./contexts/CartProvider.jsx";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />, 
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "product/:slug", element: <SingleProduct /> },

      {
        path: "cart",
        element: (
          <UserProtectedRoute>
            <Cart />
          </UserProtectedRoute>
        ),
      },

      { path: "admin/login", element: <AdminLogin /> },
      {
        path: "admin/home",
        element: (
          <ProtectedRouters>
            <AdminHome />
          </ProtectedRouters>
        ),
      },
      {
        path: "admin/add/product",
        element: (
          <ProtectedRouters>
            <AddProduct />
          </ProtectedRouters>
        ),
      },
      {
        path: "admin/add/coupon",
        element: (
          <ProtectedRouters>
            <AddCoupon />
          </ProtectedRouters>
        ),
      },
      {
        path: "admin/all/coupon",
        element: (
          <ProtectedRouters>
            <AllCoupons />
          </ProtectedRouters>
        ),
      },
      {
        path: "admin/coupons/edit/:id",
        element: (
          <ProtectedRouters>
            <EditCoupon />
          </ProtectedRouters>
        ),
      },
    ],
  },
]);


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
