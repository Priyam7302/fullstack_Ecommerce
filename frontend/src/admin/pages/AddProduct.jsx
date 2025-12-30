import React, { useState } from "react";
import instance from "../../axiosConfig.js";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    image: null,
  });
// console.log(data);
  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      setData({ ...data, image: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  function createSlug(e) {
    const nameValue = e.target.value;
    if (!nameValue) return;

    const slug = nameValue
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setData({ ...data, slug });
    document.querySelector("#slug").focus();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const product = new FormData();

    Object.keys(data).forEach((key) => {
      product.append(key, data[key]);
    });

    try {
      const response = await instance.post(
        "/product",
        product,
        { withCredentials: true }
      );

      // console.log("Product Added:", response.data);
      alert("Product added successfully!");
    } catch (error) {
      // console.error(error);
      alert("Something went wrong!");
    }
    setData({
      name: "",
      slug: "",
      category: "",
      description: "",
      originalPrice: "",
      discountedPrice: "",
      image: null,
    });
  }

  async function checkSlug(slug){
    
      const res = await instance.get("/product/checkSlug/" + slug,
      { withCredentials: true }
      );
      if (res.status === 400) {
        alert("Slug already exists. Choose different");
    }
    
  }

  return (
    <div className="add-product">
      <h2>Add a New Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            name="name"
            value={data.name}
            onChange={handleChange}
            onBlur={createSlug}
          />
        </div>

        <div className="form-group" id="slug">
          <label>Slug</label>
          <input type="text" name="slug" value={data.slug} readOnly
          onBlur={(e)=>checkSlug(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={data.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={data.originalPrice}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Discounted Price</label>
          <input
            type="number"
            name="discountedPrice"
            value={data.discountedPrice}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
