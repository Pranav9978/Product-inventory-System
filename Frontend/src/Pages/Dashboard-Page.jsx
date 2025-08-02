import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import "./Dashboard-Page.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [summaryData, setSummaryData] = useState({
    totalProducts: 0,
    stockedItems: 0,
    outOfStock: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [
          productRes,
          stockRes,
          outOfStockRes,
          pendingOrderRes,
        ] = await Promise.all([
          axios.get("http://localhost:8080/categorie/count"),
          axios.get("http://localhost:8080/stocks/count"),
          axios.get("http://localhost:8080/stocks/outofstock"),
          axios.get("http://localhost:8080/orders/pending/count"),
        ]);

        setSummaryData({
          totalProducts: productRes?.data ?? 0,
          stockedItems: stockRes?.data ?? 0,
          outOfStock: Array.isArray(outOfStockRes?.data) ? outOfStockRes.data.length : 0,
          pendingOrders: pendingOrderRes?.data ?? 0,
        });
      } catch (err) {
        console.error("📊 Dashboard API Error:", {
          message: err?.response?.data?.message || err.message || "Unknown error",
          status: err?.response?.status || "No status",
          url: err?.config?.url || "Unknown URL",
          method: err?.config?.method || "Unknown method",
        });

        alert(`Error fetching dashboard data: ${err?.response?.data?.message || err.message || "Unknown error"}`);
      }
    };

    fetchSummary();
  }, []);

  const orderChartData = [
  { name: "Total Products", value: summaryData.totalProducts },
  { name: "Stocked Items", value: summaryData.stockedItems },
  { name: "Out of Stock", value: summaryData.outOfStock },
  { name: "Pending Orders", value: summaryData.pendingOrders },
];


  const handleCardClick = (type) => {
    const routeMap = {
      available: "/total-products",
      stocked: "/stock",
      "out-of-stock": "/outofstock",
      pending: "/orders/pending",
    };

    navigate(routeMap[type] || "/");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">📊 Overall Stock Dashboard</h2>

      <div className="dashboard-card-container">
        <div className="dashboard-card" onClick={() => handleCardClick("available")}>
          🛒 Total Products: <strong>{summaryData.totalProducts}</strong>
        </div>
        <div className="dashboard-card" onClick={() => handleCardClick("stocked")}>
          📦 Stocked Items: <strong>{summaryData.stockedItems}</strong>
        </div>
        <div className="dashboard-card" onClick={() => handleCardClick("out-of-stock")}>
          ❌ Out of Stock: <strong>{summaryData.outOfStock}</strong>
        </div>
        <div className="dashboard-card" onClick={() => handleCardClick("pending")}>
          📥 Pending Orders: <strong>{summaryData.pendingOrders}</strong>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-box">
          <h4>📈 Order Status</h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={orderChartData}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="value" fill="#8884d8" />
</BarChart>

          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
