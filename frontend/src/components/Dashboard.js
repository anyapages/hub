import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import logo from '../assets/logo.png';  // Assuming the logo.png is in the correct path
import earth from '../assets/earth.png';
import quantaLogo from '../assets/quanta.png';
import './Dashboard.css'

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch data from Flask API
    axios.post('http://127.0.0.1:5000/predict')
      .then(response => {
        const { solar_radiation, carbon_footprint, electricity_demand, cloud_coverage, solar_energy_supply } = response.data;

        // Format the data for the charts
        const formattedData = solar_radiation.map((val, index) => ({
          Time: index + ":00",  // Use index as a placeholder for time
          'Solar Radiation': solar_radiation[index],
          'Carbon Footprint': carbon_footprint[index],
          'Electricity Demand': electricity_demand[index],
          'Cloud Coverage': cloud_coverage[index],
          'Energy Supply': solar_energy_supply[index]
        }));

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
      <nav style={{ padding: '10px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'space-between' }}>
        <img src={logo} alt="HelioWise Logo" style={{ height: '50px' }} />
      </nav>

      {/* Dashboard Content */}
      <div style={{ width: '100%', height: 'auto', padding: '20px' }}>
        <h1>Solar Radiation and Temperature</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="Time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Solar Radiation" stroke="#8884d8" />
            <Line type="monotone" dataKey="Energy Supply" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <h1>Energy Supply vs. Cloud Coverage</h1>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="Time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Energy Supply" fill="#8884d8" />
            <Bar dataKey="Cloud Coverage" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        {/* Earth image */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <img src={earth} alt="Earth" style={{ width: '200px', height: '200px' }} />
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <p>© HelioWise created by <img src={quantaLogo} alt="Quanta Team" style={{ height: '30px' }} /> Team</p>
      </footer>
    </div>
  );
};

export default Dashboard;