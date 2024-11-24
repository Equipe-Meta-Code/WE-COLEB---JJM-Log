import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';

const RhChart = ({ startDate, endDate }) => {
  const dadosRh = [
    { mes: 'Jan', turnover: 8, data: '2024-01-01' },
    { mes: 'Fev', turnover: 7, data: '2024-02-01' },
    { mes: 'Mar', turnover: 6, data: '2024-03-01' },
    { mes: 'Abr', turnover: 9, data: '2024-04-01' },
    { mes: 'Mai', turnover: 5, data: '2024-05-01' },
    { mes: 'Jun', turnover: 4, data: '2024-06-01' },
  ];

  const dadosFiltrados = dadosRh.filter((item) => {
    const data = moment(item.data);
    return (!startDate || data.isSameOrAfter(moment(startDate))) &&
           (!endDate || data.isSameOrBefore(moment(endDate)));
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFiltrados} margin={{ top: 10, right: 30, left: 70, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="mes" stroke="#000" />
        <YAxis
          label={{
            value: 'Turnover (%)',
            angle: -90,
            position: 'insideLeft',
            dy: 50,
            dx: -30,
          }}
          stroke="#000"
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip formatter={(value) => `${value}%`} />
        <Line type="monotone" dataKey="turnover" stroke="#336184" fill="rgba(51,97,132,0.8)" fillOpacity={1} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RhChart;
