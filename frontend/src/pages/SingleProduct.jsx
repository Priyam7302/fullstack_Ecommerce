import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useCart();
  const { isUserLoggedIn } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({
    state: "",
    text: "",
  });

  /* ======================
     CHECK IF PRODUCT IN CART
     (BACKEND USES productId)
  ====================== */
  const isInCart = product
    ? cartItems.some((item) => item.productId?._id === product._id)
    : false;

  /* ======================
     FETCH SINGLE PRODUCT
  ====================== */
  useEffect(() => {
    async function getSingleData() {
      try {
        const response = await instance.get("/product/" + slug);
        setProduct(response.data[0]); // API returns array
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getSingleData();
  }, [slug]);

  /* ======================
     ADD TO CART (QUANTITY++)
  ====================== */
  async function handleAddToCart(productId) {
    if (!isUserLoggedIn) {
      navigate("/login?nextPage=/product/" + slug);
      return;
    }

    try {
      const response = await instance.post(
        "/cart/add",
        { productId, quantity: 1 },
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        setCartItems((prev) => {
          const exists = prev.find(
            (item) => item.productId?._id === product._id
          );

          // 🔥 Increase quantity
          if (exists) {
            return prev.map((item) =>
              item.productId._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          // 🔥 First time add (MATCH BACKEND SHAPE)
          return [
            ...prev,
            {
              productId: product,
              quantity: 1,
            },
          ];
        });

        setMessage({
          state: "success",
          text: isInCart ? "✔ Quantity increased" : "✔ Product added to cart",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        state: "error",
        text: "❌ Failed to add product",
      });
    }
  }

  /* ======================
     RENDER
  ====================== */
  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="single-product">
      <div className="single-product-image">
        <img
          src={`${import.meta.env.VITE_BASEURL}/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="single-product-details">
        <h1>{product.name}</h1>
        <p className="category">{product.category}</p>

        <p className="price">
          <PiCurrencyInrLight />
          {product.discountedPrice ? (
            <>
              <del>{product.originalPrice}</del>{" "}
              <strong>{product.discountedPrice}</strong>
            </>
          ) : (
            <strong>{product.originalPrice}</strong>
          )}
        </p>

        <p className="description">{product.description}</p>

        <button
          className={`add-to-cart ${isInCart ? "added" : ""}`}
          onClick={() => handleAddToCart(product._id)}
        >
          {isInCart ? "Added" : "Add to Cart"}
        </button>

        {message.state && (
          <p className={`cart-msg ${message.state}`}>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
