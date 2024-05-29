import React from 'react';
import App from "./App";
import Navbar from './components/Navbar';
const Offer = () => {
  return (
    <div style={styles.offerContainer}>
      <h2 style={styles.title}>Special Offer</h2>
      <div style={styles.offerContent}>
        <p style={styles.offerText}>
          20% OFF!
        </p>
      </div>
    </div>
  );
};

const styles = {
  offerContainer: {
    padding: '10px',
    border: '2px solid #333',
    borderRadius: '10px',
    backgroundColor: '#f7f7f7',
  },
  title: {
    color: '#333',
    textAlign: 'center',
  },
  offerContent: {
    marginTop: '5px',
  },
  offerText: {
    color: '#666',
    fontSize: '16px',
    lineHeight: '1.5',
  },
};

export default Offer;
