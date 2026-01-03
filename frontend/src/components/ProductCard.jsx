import { PiCurrencyInrLight } from "react-icons/pi";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const imageUrl = product.images?.length
    ? `${import.meta.env.VITE_BASEURL}/uploads/${product.images[0]}`
    : product.image
    ? `${import.meta.env.VITE_BASEURL}/${product.image}`
    : "/no-image.png";

  return (
    <div className="productCard">
      <Link to={`/product/${product.slug}`}>
        <img src={imageUrl} alt={product.name} />
      </Link>

      <div className="content">
        <Link to={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>

        <p>
          <PiCurrencyInrLight />
          {product.discountedPrice ? (
            <>
              <del>{product.originalPrice}</del>
              <strong>{product.discountedPrice}</strong>
            </>
          ) : (
            <strong>{product.originalPrice}</strong>
          )}
        </p>

        <button>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
