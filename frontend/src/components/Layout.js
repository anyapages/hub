import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Layout.css';

function Layout() {
  // State variables
  const [waterUsage, setWaterUsage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');  // Clear any previous errors
  setLoading(true);  // Set loading state
  try {
    const response = await axios.post('http://127.0.0.1:5000/predict', { waterUsage });
    setPrediction(response.data.prediction);
  } catch (error) {
    console.error("There was an error with the prediction!", error);  // Log error
    setError("There was an error with the prediction. Please try again.");
  } finally {
    setLoading(false);  // Remove loading state
  }
};

  return (
    <div className="layout-container">
      <Sidebar />
      <form onSubmit={handleSubmit}>
        <label>
          Enter Water Usage (in litres):
          <input
            type="number"
            value={waterUsage}
            onChange={(e) => setWaterUsage(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {/* Error Handling */}
      {error && <p className="error">{error}</p>}

      {/* Display Prediction */}
      {prediction && !error && (
        <h2>Predicted Future Usage: {prediction} litres</h2>
      )}
    </div>
  );
}

export default Layout;
