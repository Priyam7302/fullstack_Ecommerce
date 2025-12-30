import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First.jsx";
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import AddProduct from "./admin/pages/AddProduct.jsx";
import ProtectedRouters from "./admin/components/ProtectedRouters.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Cart from "./pages/Cart.jsx";
import { CartProvider } from "./contexts/CartProvider.jsx";


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
