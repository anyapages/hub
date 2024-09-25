import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import logo from '../assets/logo.png';
import earth from '../assets/earth.gif';
import quantaLogo from '../assets/quanta.png';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.post('http://127.0.0.1:5000/predict')
      .then(response => {
        const { prediction, solar_radiation, carbon_footprint, electricity_demand, cloud_coverage, solar_energy_supply } = response.data;

        const formattedData = solar_radiation.map((val, index) => ({
          Time: index + "",
          'Solar Radiation': solar_radiation[index],
          'Carbon Footprint': carbon_footprint[index],
          'Electricity Demand': electricity_demand[index],
          'Cloud Coverage': cloud_coverage[index],
          'Energy Supply': solar_energy_supply[index]
        }));
        setPrediction(prediction);
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
          backgroundColor: '#ADD8E6',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
          <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
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
        margin: '0 auto'
      }}>        
        <h1>Solar Radiation (W/m²)</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis label={{ value: "Time", position: 'insideBottom', offset: -5 }} dataKey="Time" />
            <YAxis label={{ value: "W/m²", angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value} W/m²`} />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Solar Radiation" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Energy Supply (kWh)</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis label={{ value: "Time", position: 'insideBottom', offset: -5 }} dataKey="Time" />
            <YAxis label={{ value: "kWh", angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value} kWh`} />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Energy Supply" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Carbon Footprint (kg CO₂)</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis label={{ value: "Time", position: 'insideBottom', offset: -5 }} dataKey="Time" />
            <YAxis label={{ value: "kg CO₂", angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value} kg CO₂`} />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Carbon Footprint" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Electricity Demand (MW)</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis label={{ value: "Time", position: 'insideBottom', offset: -5 }} dataKey="Time" />
            <YAxis label={{ value: "MW", angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value} MW`} />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Electricity Demand" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Cloud Coverage (%)</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis label={{ value: "Time", position: 'insideBottom', offset: -5 }} dataKey="Time" />
            <YAxis label={{ value: "%", angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value}%`} />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Cloud Coverage" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
   
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
          <p>© HelioWise created by</p> <p> <img src={quantaLogo} alt="Quanta Team" style={{ height: '90px' }} /></p>
      </footer>
    </div>
  );
};

export default Dashboard;