import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";
import Loader from "../components/Loader";


const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useCart();
  const { isUserLoggedIn } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [message, setMessage] = useState({
    state: "",
    text: "",
  });

  const isInCart = product
    ? cartItems.some((item) => item.productId?._id === product._id)
    : false;
  useEffect(() => {
    async function getSingleData() {
      try {
        const response = await instance.get("/product/" + slug);
        setProduct(response.data[0]);
        setSelectedImageIndex(0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getSingleData();
  }, [slug]);


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

          if (exists) {
            return prev.map((item) =>
              item.productId._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
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

 if (loading) return <Loader />;

  if (!product) return <p>Product not found</p>;

  const images = product.images || (product.image ? [product.image] : []);
  const mainImage = images[selectedImageIndex] || images[0] || '';

  return (
    <div className="single-product">
      <div className="single-product-image">
        <div className="main-image-container">
          <img
            src={`${import.meta.env.VITE_BASEURL}/uploads/${mainImage}`}
            alt={product.name}
          />
        </div>
        {images.length > 1 && (
          <div className="thumbnail-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  selectedImageIndex === index ? "active" : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={`${import.meta.env.VITE_BASEURL}/uploads/${img}`}
                  alt={`${product.name} ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
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
// import { useEffect, useState } from "react";
// import instance from "../axiosConfig";
// import { useNavigate, useParams } from "react-router-dom";
// import { PiCurrencyInrLight } from "react-icons/pi";
// import { useAuth } from "../contexts/AuthProvider";
// import { useCart } from "../contexts/CartProvider";
// import Loader from "../components/Loader";

// const SingleProduct = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { cartItems, setCartItems } = useCart();
//   const { isLoggedIn } = useAuth();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const res = await instance.get(`/product/${slug}`);
//         setProduct(res.data[0]);
//         setSelectedImageIndex(0);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProduct();
//   }, [slug]);

//   if (loading) return <Loader />;
//   if (!product) return <p>Product not found</p>;

//   const images = product.images?.length
//     ? product.images
//     : product.image
//     ? [product.image.replace("uploads/", "")]
//     : [];

//   const mainImage = images[selectedImageIndex];

//   async function addToCart() {
//     if (!isLoggedIn) {
//       navigate(`/login?nextPage=/product/${slug}`);
//       return;
//     }

//     await instance.post("/cart/add", {
//       productId: product._id,
//       quantity: 1,
//     });

//     setCartItems((prev) => [...prev]);
//   }

//   return (
//     <div className="single-product">
//       <div className="single-product-image">
//         <img
//           src={`${import.meta.env.VITE_BASEURL}/uploads/${mainImage}`}
//           alt={product.name}
//         />

//         {images.length > 1 && (
//           <div className="thumbnail-gallery">
//             {images.map((img, index) => (
//               <img
//                 key={index}
//                 src={`${import.meta.env.VITE_BASEURL}/uploads/${img}`}
//                 alt=""
//                 onClick={() => setSelectedImageIndex(index)}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="single-product-details">
//         <h1>{product.name}</h1>
//         <p>{product.category}</p>

//         <p>
//           <PiCurrencyInrLight />
//           {product.discountedPrice ? (
//             <>
//               <del>{product.originalPrice}</del>{" "}
//               <strong>{product.discountedPrice}</strong>
//             </>
//           ) : (
//             <strong>{product.originalPrice}</strong>
//           )}
//         </p>

//         <p>{product.description}</p>

//         <button onClick={addToCart}>Add to Cart</button>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;
