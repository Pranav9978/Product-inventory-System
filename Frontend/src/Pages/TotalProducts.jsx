
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TotalProducts.css"; 

const API_URL = "http://localhost:8080/categorie"; 

const TotalProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="total-products-container">
      <h2 className="page-title">🛍️ All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.productId}>
            <img
              src={product.imageUrl}
              alt={product.name}
              onError={(e) => {
                if (!e.target.dataset.hasError) {
                  e.target.src =
                    "https://via.placeholder.com/250x150?text=No+Image";
                  e.target.dataset.hasError = "true";
                }
              }}
            />
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Status:</strong> {product.status}</p>
           
            <p className="desc">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalProducts;
