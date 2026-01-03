import  { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import instance from "../axiosConfig";
import Loader from "../components/Loader";


const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const res = await instance.get("/product");
    setProducts(res.data);
    setLoading(false);
  }

  function handleScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 5) {
      duplicateProducts();
    }
  }

  function duplicateProducts() {
    setProducts((prev) => [...prev, ...prev]);
  }

  return (
    <>
      <div className="products-container">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} slug={product.slug} />
        ))}
      </div>
      {loading && <Loader size="small" />}
    </>
  );

};

export default Product;
