import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { Date: '2024-09-01', Time: '12:00', 'Solar Radiation': 0.85, Temperature: 25, 'Energy Supply': 500 },
  { Date: '2024-09-01', Time: '13:00', 'Solar Radiation': 0.90, Temperature: 27, 'Energy Supply': 520 },
  { Date: '2024-09-01', Time: '14:00', 'Solar Radiation': 0.88, Temperature: 26, 'Energy Supply': 530 },
  { Date: '2024-09-02', Time: '12:00', 'Solar Radiation': 0.70, Temperature: 20, 'Energy Supply': 420 },
  { Date: '2024-09-02', Time: '13:00', 'Solar Radiation': 0.75, Temperature: 22, 'Energy Supply': 450 },
];

const Dashboard = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h1>Solar Radiation and Temperature</h1>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="Time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="Solar Radiation" stroke="#8884d8" />
          <Line type="monotone" dataKey="Temperature" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <h1>Energy Supply</h1>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="Time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Energy Supply" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;