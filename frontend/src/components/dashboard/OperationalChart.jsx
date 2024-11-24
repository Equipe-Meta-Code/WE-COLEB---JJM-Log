import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';

const OperationalChart = ({ startDate, endDate }) => {
  const dadosOperacional = [
    { mes: 'Jan', produtividade: 85, data: '2024-01-01' },
    { mes: 'Fev', produtividade: 90, data: '2024-02-01' },
    { mes: 'Mar', produtividade: 88, data: '2024-03-01' },
    { mes: 'Abr', produtividade: 92, data: '2024-04-01' },
    { mes: 'Mai', produtividade: 89, data: '2024-05-01' },
    { mes: 'Jun', produtividade: 94, data: '2024-06-01' },
  ];

  const dadosFiltrados = dadosOperacional.filter((item) => {
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
            value: 'Produtividade (%)',
            angle: -90,
            position: 'insideLeft',
            dy: 50,
            dx: -30,
          }}
          stroke="#000"
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip formatter={(value) => `${value}%`} />
        <Line type="monotone" dataKey="produtividade" stroke="#336184" fill="rgba(51,97,132,0.8)" fillOpacity={1} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OperationalChart;
