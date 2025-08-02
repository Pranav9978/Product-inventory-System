import React from "react";
import "./OutOfStockTable.css";

const OutOfStockTable = ({ stocks, products }) => {
  const outOfStockItems = stocks?.filter(
    (stock) => parseInt(stock.availableStock) === 0
  );

  const getProductName = (productId) => {
    const product = products.find((p) => p.productId === productId);
    return product ? product.name : "Unknown Product";
  };

  return (
    <div className="out-of-stock-section">
      <h2>🚨 Out of Stock Products</h2>
      {outOfStockItems && outOfStockItems.length > 0 ? (
        <table className="stock-table">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {outOfStockItems.map((item) => (
              <tr key={item.stockId}>
                <td>{item.stockId}</td>
                <td>{item.productId}</td>
                <td>{getProductName(item.productId)}</td>
                <td>{item.availableStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No out-of-stock products.</p>
      )}
    </div>
  );
};

export default OutOfStockTable;
