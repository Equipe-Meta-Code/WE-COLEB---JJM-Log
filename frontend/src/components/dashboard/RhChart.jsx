import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../../services/api';


const RhChart = () => {
  const [turnoverData, setTurnoverData] = useState([]);

  useEffect(() => {
    // Fetch turnover data
    const fetchTurnover = async () => {
      try {
        const response = await api.get('/RhDashboard');
        setTurnoverData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de turnover:', error);
      }
    };

    fetchTurnover();
  }, []);

  return (
    <div>
      <h3>Taxa de Turnover por Cliente</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={turnoverData} margin={{ top: 10, right: 30, left: 70, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="clienteId" stroke="#000" label={{ value: 'Cliente ID', position: 'insideBottom', dy: 10 }} />
          <YAxis
            label={{ value: 'Turnover (%)', angle: -90, position: 'insideLeft', dx: -20 }}
            stroke="#000"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="turnover" fill="#336184" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RhChart;
