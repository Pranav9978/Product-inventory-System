import React from "react";

const Aboutus = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Mall Inventory System</h1>
      <p style={styles.text}>
        The Mall Inventory System is a centralized platform designed to manage and track all products, stock, and orders across multiple stores in a mall. It helps administrators monitor inventory levels, handle product categories, and optimize order workflows efficiently.
      </p>

      <h3 style={styles.subHeading}>Key Features</h3>
      <ul style={styles.list}>
        <li>✔ Real-time stock tracking</li>
        <li>✔ Product and category management</li>
        <li>✔ Order and return management</li>
        <li>✔ Low stock alerts and reports</li>
        <li>✔ Secure admin access</li>
      </ul>

      <h3 style={styles.subHeading}>Technology Stack</h3>
      <ul style={styles.list}>
        <li>📦 Backend: Java Spring Boot</li>
        <li>🌐 Frontend: React (Vite)</li>
        <li>🗃 Database: MySQL</li>
        <li>🎨 Styling: CSS & Bootstrap</li>
      </ul>

      <p style={styles.footerText}>
        This project is developed and maintained by the Mall IT Department. For any support or queries, please visit the Contact page.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
    color: "#2f3e46",
    lineHeight: "1.6"
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center"
  },
  subHeading: {
    fontSize: "20px",
    marginTop: "25px"
  },
  list: {
    paddingLeft: "20px",
    listStyleType: "none"
  },
  text: {
    fontSize: "16px"
  },
  footerText: {
    marginTop: "30px",
    fontStyle: "italic"
  }
};

export default Aboutus;
