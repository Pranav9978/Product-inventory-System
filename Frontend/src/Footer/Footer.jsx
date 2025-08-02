import React from 'react';
import './Footer.css'; // Optional: Import a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} StockMaster . All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
       
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
