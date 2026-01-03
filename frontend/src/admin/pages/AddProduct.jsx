import React, { useState, useRef } from "react";
import instance from "../../axiosConfig.js";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    // append new images
    setImages((prev) => [...prev, ...files]);

    // generate previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  }

  function removeImage(index) {
    // revoke the objectURL to release memory
    setImagePreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });

    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function createSlug(e) {
    const nameValue = e.target.value;
    if (!nameValue) return;

    const slug = nameValue
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setData((prev) => ({ ...prev, slug }));
  }

  async function checkSlug(slug) {
    if (!slug) return;

    try {
      await instance.get(`/product/checkSlug/${slug}`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Slug already exists. Choose another");
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    const product = new FormData();

    // text fields
    Object.keys(data).forEach((key) => {
      product.append(key, data[key]);
    });

    images.forEach((img) => {
      product.append("images", img);
    });

    try {
      await instance.post("/product", product, {
        withCredentials: true,
      });

      toast.success("Product added successfully!");

      // reset form
      setData({
        name: "",
        slug: "",
        category: "",
        description: "",
        originalPrice: "",
        discountedPrice: "",
      });
      // revoke any object URLs used for previews
      imagePreviews.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (err) {}
      });

      setImages([]);
      setImagePreviews([]);

      // clear the file input value so it shows empty in the UI
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }

  return (
    <div className="add-product">
      <h2>Add a New Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* NAME */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            onBlur={createSlug}
            required
          />
        </div>

        {/* SLUG */}
        <div className="form-group">
          <label>Slug</label>
          <input
            type="text"
            value={data.slug}
            readOnly
            onBlur={(e) => checkSlug(e.target.value)}
          />
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={data.category}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="large-textarea"
            name="description"
            rows={6}
            value={data.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* PRICES */}
        <div className="form-group">
          <label>Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={data.originalPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Discounted Price</label>
          <input
            type="number"
            name="discountedPrice"
            value={data.discountedPrice}
            onChange={handleChange}
            required
          />
        </div>

        {/* IMAGES */}
        <div className="form-group">
          <label>Product Images</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* IMAGE PREVIEW */}
        {imagePreviews.length > 0 && (
          <div className="image-preview-grid">
            {imagePreviews.map((src, index) => (
              <div className="image-preview" key={index}>
                <img src={src} alt="preview" />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeImage(index)}
                >
                  <RxCross2 />
                </button>
              </div>
            ))}
          </div>
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
