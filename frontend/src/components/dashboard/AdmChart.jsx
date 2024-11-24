import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';

const AdmChart = ({ startDate, endDate }) => {
  const dadosAdm = [
    { mes: 'Jan', novos_clientes: 15, data: '2024-01-01'},
    { mes: 'Fev', novos_clientes: 18, data: '2024-02-01'},
    { mes: 'Mar', novos_clientes: 12, data: '2024-03-01' },
    { mes: 'Abr', novos_clientes: 20, data: '2024-04-01' },
    { mes: 'Mai', novos_clientes: 25, data: '2024-05-01'},
    { mes: 'Jun', novos_clientes: 17, data: '2024-06-01' },
  ];

  const dadosFiltrados = dadosAdm.filter((item) => {
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
            value: 'Novos Clientes',
            angle: -90,
            position: 'insideLeft',
            dy: 50,
            dx: -30,
          }}
          stroke="#000"
        />
        <Tooltip />
        <Line type="monotone" dataKey="novos_clientes" stroke="#336184" fill="rgba(51,97,132,0.8)" fillOpacity={1} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AdmChart;
