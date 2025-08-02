import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PendingOrders.css";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.productId === productId);
    return product ? product.name : "Unknown";
  };

  return (
    <div className="pending-section">
      <h3>📦 Pending Orders</h3>
      <table className="pending-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.filter((order) => order.status === "Pending").length === 0 ? (
            <tr>
              <td colSpan="5">No pending orders found.</td>
            </tr>
          ) : (
            orders
              .filter((order) => order.status === "Pending")
              .map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{getProductName(order.productId)}</td>
                  <td>{order.quantityOrdered}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.status}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
