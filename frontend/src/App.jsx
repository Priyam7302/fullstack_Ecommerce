import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First";
import AdminLogin from "./admin/pages/AdminLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./contexts/AuthProvider";
import AddProduct from "./admin/pages/AddProduct";
import ProtectedRouters from "./admin/components/ProtectedRouters";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/CartProvider";
// import CartProvider from "./contexts/CartProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/home",
        element: <AdminLogin />,
      },
      {
        path: "/logout",
        element: <Login />,
      },
      {
        path: "/product/:slug",
        element: <SingleProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin/product/add",
        element: (
          <ProtectedRouters>
            <AddProduct />
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
      </CartProvider>
    </AuthProvider>
  );
}
export default App;
