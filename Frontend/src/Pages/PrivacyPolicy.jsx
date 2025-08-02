import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Privacy Policy</h1>
      <p style={styles.updated}>Last updated: August 2, 2025</p>

      <section style={styles.section}>
        <h2 style={styles.subheading}>1. Introduction</h2>
        <p>
          Welcome to the Mall Inventory System. This privacy policy outlines how we collect,
          use, and protect your data. By using our application, you agree to the collection
          and use of information in accordance with this policy.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>2. Information We Collect</h2>
        <ul>
          <li>Inventory data including products, categories, and stock levels</li>
          <li>Administrative user data (email, name, etc.)</li>
          <li>Browser and device data for analytics purposes</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>3. How We Use Your Data</h2>
        <p>
          The data collected is used for:
        </p>
        <ul>
          <li>Managing and tracking mall inventory efficiently</li>
          <li>Ensuring secure access to admin functionalities</li>
          <li>Improving performance and usability of the system</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to
          protect your data from unauthorized access, alteration, or disclosure.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>5. Third-Party Services</h2>
        <p>
          We do not share your information with third parties except when required by law
          or for essential technical operations (e.g., database hosting).
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>6. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will be posted
          on this page with the updated date.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>7. Contact Us</h2>
        <p>
          If you have any questions about this policy, please contact us at:
          <br />
          <strong>Email:</strong> support@mallinventory.com
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2f3e46',
    marginBottom: '10px',
    textAlign: 'center'
  },
  updated: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '30px',
    textAlign: 'center'
  },
  section: {
    marginBottom: '25px'
  },
  subheading: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2f3e46',
    marginBottom: '10px'
  }
};

export default PrivacyPolicy;
