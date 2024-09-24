import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import logo from '../assets/logo.png';  // Assuming the logo.png is in the correct path
import earth from '../assets/earth.gif';
import quantaLogo from '../assets/quanta.png';
import './Dashboard.css'

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [prediction, setPrediction] = useState(null);  // Separate state for prediction
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch data from Flask API
    axios.post('http://127.0.0.1:5000/predict')
      .then(response => {
        const { prediction, solar_radiation, carbon_footprint, electricity_demand, cloud_coverage, solar_energy_supply } = response.data;

        // Format the data for the charts
        const formattedData = solar_radiation.map((val, index) => ({
          Time: index + ":00",  // Use index as a placeholder for time
          'Solar Radiation': solar_radiation[index],
          'Carbon Footprint': carbon_footprint[index],
          'Electricity Demand': electricity_demand[index],
          'Cloud Coverage': cloud_coverage[index],
          'Energy Supply': solar_energy_supply[index]
        }));
        setPrediction(prediction);  // Store prediction separately
        setData(formattedData);
      })
      .catch(error => {
        setError('Error fetching data: ' + error.message);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <nav style={{
          padding: '10px',
          backgroundColor: '#ADD8E6',  // Light blue background color
          display: 'flex',
          justifyContent: 'center',  // Center the content
          alignItems: 'center',      // Align vertically
          position: 'sticky',        // Make navbar sticky
          top: 0,                    // Stick to the top
          zIndex: 1000,              // Ensure it's above other content
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional: add a shadow
      }}>
          <div style={{
              display: 'flex',
              alignItems: 'center',   // Align items in the div
              gap: '10px'             // Add some space between logo and text
          }}>
              <img src={logo} alt="HelioWise Logo" style={{ height: '80px' }} />
              {prediction !== null
                ? <h1 style={{ margin: 0 }}>Solar Energy Price Prediction: ${prediction.toFixed(2)}</h1>
                : <h1 style={{ margin: 0 }}>Loading prediction...</h1>
              }
          </div>
      </nav>

      {/* Earth image */}
      <h1>Live Earth Image</h1>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <img src={earth} alt="Earth" style={{ width: '400px', height: '400px' }} />
      </div>

      {/* Dashboard Content */}
      

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '80%', 
        height: 'auto', 
        padding: '20px',
        margin: '0 auto'  // This centers the container horizontally
      }}>        
      <h1>Solar Radiation</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="Time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Solar Radiation" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Energy Supply</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="Time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Energy Supply" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Carbon Footprint</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="Time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Carbon Footprint" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Carbon Footprint</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="Time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Electricity Demand" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Electricity Demand</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="Time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Cloud Coverage" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Cloud Coverage</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="Time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Carbon Footprint" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <p>© HelioWise created by <img src={quantaLogo} alt="Quanta Team" style={{ height: '30px' }} /> Team</p>
      </footer>
    </div>
  );
};

export default Dashboard;