import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./OrderForm.css";

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);

  const [formData, setFormData] = useState({
    productId: "",
    quantityOrdered: 1,
    orderDate: new Date().toISOString().split("T")[0],
    status: "Pending",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/categorie");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getProductName = (productId) => {
    const product = products.find((p) => Number(p.productId) === Number(productId));
    return product ? product.name : "Unknown";
  };

  const productOptions = products.map((product) => ({
    value: Number(product.productId),
    label: product.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && editingOrderId) {
        await axios.put(`http://localhost:8080/orders/${editingOrderId}`, {
          ...formData,
          productId: Number(formData.productId),
        });
        alert("✅ Order updated!");
      } else {
        await axios.post("http://localhost:8080/orders", {
          ...formData,
          productId: Number(formData.productId),
        });
        alert("✅ Order placed!");
      }

      setFormData({
        productId: "",
        quantityOrdered: 1,
        orderDate: new Date().toISOString().split("T")[0],
        status: "Pending",
      });
      setEditMode(false);
      setEditingOrderId(null);
      fetchOrders();
    } catch (err) {
      console.error("Order submission error:", err);
      alert("❌ Failed to process order.");
    }
  };

  const handleEdit = (order) => {
    setFormData({
      productId: order.productId,
      quantityOrdered: order.quantityOrdered,
      orderDate: order.orderDate,
      status: order.status,
    });
    setEditMode(true);
    setEditingOrderId(order.orderId);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:8080/orders/${id}`);
        alert("🗑️ Order deleted.");
        fetchOrders();
      } catch (err) {
        console.error("Delete error:", err);
        alert("❌ Failed to delete order.");
      }
    }
  };

  return (
    <div>
    <div className="order-form-container">
      <h2>{editMode ? "✏️ Edit Order" : "📝 Create Order"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Product:</label>
        <Select
          options={productOptions}
          value={
            formData.productId
              ? {
                  value: Number(formData.productId),
                  label: getProductName(formData.productId),
                }
              : null
          }
          onChange={(selected) =>
            setFormData({ ...formData, productId: selected?.value || "" })
          }
          placeholder="Search or select a product..."
          isClearable
          isSearchable
          required
        />

        <label>Quantity:</label>
        <input
          type="number"
          name="quantityOrdered"
          value={formData.quantityOrdered}
          onChange={handleChange}
          min="1"
          required
        />

        <label>Order Date:</label>
        <input
          type="date"
          name="orderDate"
          value={formData.orderDate}
          onChange={handleChange}
          required
        />

        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit">{editMode ? "Update Order" : "Place Order"}</button>
      </form>
          </div>
      <div className="table-section">
        <h3>📦 Order List</h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6">No orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{getProductName(order.productId)}</td>
                  <td>{order.quantityOrdered}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.status}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(order)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(order.orderId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default OrderForm;
