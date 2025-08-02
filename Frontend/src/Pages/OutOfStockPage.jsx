// OutOfStockPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import OutOfStockTable from "./OutOfStockTable";
import OrderForm from "./OrderForm";
import "./OutOfStockPage.css";

const STOCK_API = "http://localhost:8080/stocks";
const PRODUCT_API = "http://localhost:8080/categorie";

const OutOfStockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchStocks = async () => {
    try {
      const res = await axios.get(STOCK_API);
      setStocks(res.data);
    } catch (err) {
      console.error("Failed to fetch stocks", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCT_API);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchStocks();
    fetchProducts();
  }, []);

  const handleOrderClick = (productId) => {
    setSelectedProductId(productId);
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setSelectedProductId(null);
  };

  return (
    <div className="out-of-stock-page">
      <h2>Out of Stock Items</h2>
      <OutOfStockTable
        stocks={stocks}
        products={products}
        onOrderClick={handleOrderClick}
      />

      {showOrderForm && (
        <div className="order-form-modal">
          <div className="order-form-modal-content">
            <button className="close-btn" onClick={handleCloseOrderForm}>❌</button>
            <OrderForm defaultProductId={selectedProductId} onClose={handleCloseOrderForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OutOfStockPage;
