import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductManager.css";

const PRODUCT_API = "http://localhost:8080/categorie";
const CATEGORY_API = "http://localhost:8080/categories";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productId: null,
    name: "",
    price: "",
    status: "available",
    description: "",
    categoryId: "",
    imageUrl: "",
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCT_API);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      name: formData.name,
      price: parseFloat(formData.price),
      status: formData.status,
      description: formData.description,
      categoryId: parseInt(formData.categoryId),
      imageUrl: formData.imageUrl,
    };

    if (formData.productId) {
      await axios.put(`${PRODUCT_API}/${formData.productId}`, payload);
    } else {
      await axios.post(PRODUCT_API, payload);
    }

    setFormData({
      productId: null,
      name: "",
      price: "",
      status: "available",
      description: "",
      categoryId: "",
      imageUrl: "",
    });

    fetchProducts();
  } catch (err) {
    if (err.response) {
      console.error("🔴 Server error:", err.response.data);
      alert("Server Error: " + (err.response.data.message || "Unknown Error"));
    } else if (err.request) {
      console.error("🟡 No response from server:", err.request);
      alert("Network Error: No response from server.");
    } else {
      console.error("⚠️ Request error:", err.message);
      alert("Error: " + err.message);
    }
  }




  };

  const handleEdit = (product) => {
  setFormData({
    productId: product.productId,
    name: product.name,
    price: product.price,
    status: product.status,
    description: product.description,
    categoryId: product.categoryId?.toString() || "",
    imageUrl: product.imageUrl || "",
  });
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${PRODUCT_API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

 const getCategoryName = (id) => {
  const cat = categories.find((c) => c.categoryId === id);
  return cat ? cat.categoryName : "N/A";
};


  return (
    <div className="product-manager">
      <h2>Add / Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="">---Select Status---</option>
          <option value="available">Available</option>
          <option value="out_of_stock">Out of Stock</option>
          <option value="ordered">Ordered</option>
        </select>

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">---Select Category---</option>
         {categories.map((cat) => (
  <option key={cat.categoryId} value={cat.categoryId}>
    {cat.categoryName}
  </option>
))}

        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit" disabled={!formData.name || !formData.price || !formData.categoryId}>
  {formData.productId ? "Update Product" : "Add Product"}
</button>

      </form>

      <h2>Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>
     <img
  src={product.imageUrl}
  alt={product.name}
  width="80"
  height="60"
  onError={(e) => {
    if (!e.target.src.includes("placeholder.com")) {
      e.target.onerror = null;
      e.target.src = "https://via.placeholder.com/80x60?text=No+Image";
    }
  }}
/>


              </td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.status}</td>
              <td>{getCategoryName(product.categoryId)}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.productId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager;
