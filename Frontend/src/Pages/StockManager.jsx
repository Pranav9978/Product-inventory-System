import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StockManager.css";
import Select from "react-select";
import OutOfStockTable from "./OutOfStockTable";

const STOCK_API = "http://localhost:8080/stocks";
const PRODUCT_API = "http://localhost:8080/categorie";

const StockManager = () => {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);

  const [formData, setFormData] = useState({
    stockId: null,
    productId: "",
    quantity: "",
    minStockLevel: "",
    availableStock: ""
  });

  const fetchStockData = async () => {
    try {
      const res = await axios.get(STOCK_API);
      setStocks(res.data);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCT_API);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchOutOfStock = async () => {
    try {
      const res = await axios.get(`${STOCK_API}/outofstock`);
      setOutOfStock(res.data);
    } catch (err) {
      console.error("Error fetching out of stock data:", err);
    }
  };

  useEffect(() => {
    fetchStockData();
    fetchProducts();
    fetchOutOfStock();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        quantity: parseInt(formData.quantity),
        minStockLevel: parseInt(formData.minStockLevel),
        availableStock: parseInt(formData.availableStock),
        status:
          parseInt(formData.availableStock) === 0
            ? "out_of_stock"
            : parseInt(formData.availableStock) <= parseInt(formData.minStockLevel)
            ? "low_stock"
            : "available",
      };

      if (formData.stockId) {
        await axios.put(`${STOCK_API}/${formData.stockId}`, payload);
      } else {
        await axios.post(STOCK_API, payload);
      }

      setFormData({
        stockId: null,
        productId: "",
        quantity: "",
        minStockLevel: "",
        availableStock: ""
      });

      fetchStockData();
      fetchOutOfStock(); 
    } catch (err) {
      console.error("Error submitting stock:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (stock) => {
    setFormData({
      stockId: stock.stockId,
      productId: stock.productId,
      quantity: stock.quantity,
      minStockLevel: stock.minStockLevel,
      availableStock: stock.availableStock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${STOCK_API}/${id}`);
      fetchStockData();
      fetchOutOfStock();
    } catch (err) {
      console.error("Error deleting stock:", err);
    }
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.productId === productId);
    return product ? product.name : "Unknown Product";
  };

  return (
    <div className="stock-manager">
      <div className="stock-form-section">
        <h2>📦 Stock Management</h2>
        <form onSubmit={handleSubmit} className="stock-form">
          <Select
            options={products.map((product) => ({
              value: product.productId,
              label: product.name,
            }))}
            value={
              formData.productId
                ? {
                    value: formData.productId,
                    label: getProductName(formData.productId),
                  }
                : null
            }
            onChange={(selectedOption) =>
              setFormData({ ...formData, productId: selectedOption?.value || "" })
            }
            placeholder="Search or select a product..."
            isClearable
            isSearchable
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="minStockLevel"
            placeholder="Min Stock Level"
            value={formData.minStockLevel}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="availableStock"
            placeholder="Available Stock"
            value={formData.availableStock}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {formData.stockId ? "Update Stock" : "Add Stock"}
          </button>
        </form>
      </div>

      <div className="stock-table-section">
        <h3>📋 Current Stock Data</h3>
        <table className="stock-table">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Min Level</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.stockId}>
                <td>{stock.stockId}</td>
                <td>{getProductName(stock.productId)}</td>
                <td>{stock.quantity}</td>
                <td>{stock.minStockLevel}</td>
                <td>{stock.availableStock}</td>
                <td>
                  <button onClick={() => handleEdit(stock)}>Edit</button>
                  <button onClick={() => handleDelete(stock.stockId)}>Delete</button>
                </td>
              </tr>
            ))}
            {stocks.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default StockManager;
