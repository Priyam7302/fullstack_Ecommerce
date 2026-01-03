// import React, { useState } from "react";
// import instance from "../../axiosConfig.js";

// function AddProduct() {
//   const [data, setData] = useState({
//     name: "",
//     slug: "",
//     category: "",
//     description: "",
//     originalPrice: "",
//     discountedPrice: "",
//     image: null,
//   });
// // console.log(data);
//   function handleChange(e) {
//     const { name, value, files } = e.target;

//     if (name === "image") {
//       setData({ ...data, image: files[0] });
//     } else {
//       setData({ ...data, [name]: value });
//     }
//   }

//   function createSlug(e) {
//     const nameValue = e.target.value;
//     if (!nameValue) return;

//     const slug = nameValue
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "");

//     setData({ ...data, slug });
//     document.querySelector("#slug").focus();
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const product = new FormData();

//     Object.keys(data).forEach((key) => {
//       product.append(key, data[key]);
//     });

//     try {
//       const response = await instance.post(
//         "/product",
//         product,
//         { withCredentials: true }
//       );

//       // console.log("Product Added:", response.data);
//       alert("Product added successfully!");
//     } catch (error) {
//       // console.error(error);
//       alert("Something went wrong!");
//     }
//     setData({
//       name: "",
//       slug: "",
//       category: "",
//       description: "",
//       originalPrice: "",
//       discountedPrice: "",
//       image: null,
//     });
//   }

//   async function checkSlug(slug){
    
//       const res = await instance.get("/product/checkSlug/" + slug,
//       { withCredentials: true }
//       );
//       if (res.status === 400) {
//         alert("Slug already exists. Choose different");
//     }
    
//   }

//   return (
//     <div className="add-product">
//       <h2>Add a New Product</h2>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             placeholder="Enter product name"
//             name="name"
//             value={data.name}
//             onChange={handleChange}
//             onBlur={createSlug}
//           />
//         </div>

//         <div className="form-group" id="slug">
//           <label>Slug</label>
//           <input type="text" name="slug" value={data.slug} readOnly
//           onBlur={(e)=>checkSlug(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Category</label>
//           <input
//             type="text"
//             name="category"
//             value={data.category}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={data.description}
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         <div className="form-group">
//           <label>Original Price</label>
//           <input
//             type="number"
//             name="originalPrice"
//             value={data.originalPrice}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Discounted Price</label>
//           <input
//             type="number"
//             name="discountedPrice"
//             value={data.discountedPrice}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Image</label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;
import React, { useState } from "react";
import instance from "../../axiosConfig.js";
import { toast } from "react-toastify";

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
    document.querySelector("#slug")?.focus();
  }

  /* ======================
     CHECK SLUG
  ====================== */
  async function checkSlug(slug) {
    if (!slug) return;

    try {
      await instance.get(`/product/checkSlug/${slug}`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Slug already exists. Choose a different one");
      }
    }
  }

  /* ======================
     SUBMIT PRODUCT
  ====================== */
  async function handleSubmit(e) {
    e.preventDefault();

    const product = new FormData();
    Object.keys(data).forEach((key) => {
      product.append(key, data[key]);
    });

    try {
      await instance.post("/product", product, {
        withCredentials: true,
      });

      toast.success("Product added successfully!");

      setData({
        name: "",
        slug: "",
        category: "",
        description: "",
        originalPrice: "",
        discountedPrice: "",
        image: null,
      });
    } catch (error) {
      console.error(error);
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
            placeholder="Enter product name"
            name="name"
            value={data.name}
            onChange={handleChange}
            onBlur={createSlug}
            required
          />
        </div>

        {/* SLUG */}
        <div className="form-group" id="slug">
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            value={data.slug}
            readOnly
            onBlur={(e) => checkSlug(e.target.value)}
            required
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
            name="description"
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

        {/* IMAGE */}
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
