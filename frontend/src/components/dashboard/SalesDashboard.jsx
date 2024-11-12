import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Dados simulados para 12 meses
    const staticSalesData = [
      { mes: "10/2024", tentativas: 150, conversoes: 75, clientes_mes_passado: 200, clientes_ativos: 180 },
      { mes: "09/2024", tentativas: 130, conversoes: 60, clientes_mes_passado: 180, clientes_ativos: 170 },
      { mes: "08/2024", tentativas: 120, conversoes: 50, clientes_mes_passado: 170, clientes_ativos: 160 },
      { mes: "07/2024", tentativas: 140, conversoes: 70, clientes_mes_passado: 160, clientes_ativos: 155 },
      { mes: "06/2024", tentativas: 160, conversoes: 80, clientes_mes_passado: 155, clientes_ativos: 150 },
      { mes: "05/2024", tentativas: 155, conversoes: 75, clientes_mes_passado: 150, clientes_ativos: 140 },
      { mes: "04/2024", tentativas: 145, conversoes: 65, clientes_mes_passado: 140, clientes_ativos: 130 },
      { mes: "03/2024", tentativas: 135, conversoes: 55, clientes_mes_passado: 130, clientes_ativos: 125 },
      { mes: "02/2024", tentativas: 125, conversoes: 60, clientes_mes_passado: 120, clientes_ativos: 115 },
      { mes: "01/2024", tentativas: 115, conversoes: 55, clientes_mes_passado: 110, clientes_ativos: 105 },
      { mes: "12/2023", tentativas: 110, conversoes: 50, clientes_mes_passado: 100, clientes_ativos: 95 },
      { mes: "11/2023", tentativas: 105, conversoes: 45, clientes_mes_passado: 95, clientes_ativos: 90 },
    ];
    
    setSalesData(staticSalesData);
  }, []);

  const calculateConversionRate = (data) => data.map(item => ({
    mes: item.mes,
    taxaConversao: ((item.conversoes / item.tentativas) * 100).toFixed(2),
  }));

  const calculateRetentionRate = (data) => data.map(item => ({
    mes: item.mes,
    taxaRetencao: ((item.clientes_ativos / item.clientes_mes_passado) * 100).toFixed(2),
  }));

  const conversionRateData = calculateConversionRate(salesData);
  const retentionRateData = calculateRetentionRate(salesData);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h5 style={{ color: '#000' }}>Taxa de Conversão (%) por Mês</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={conversionRateData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="mes" stroke="#000" />
            <YAxis domain={[0, 100]} stroke="#000" tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Line type="monotone" dataKey="taxaConversao" stroke="#82ca9d" name="Conversão" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <h5 style={{ color: '#000' }}>Taxa de Retenção (%) por Mês</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={retentionRateData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="mes" stroke="#000" />
            <YAxis domain={[0, 100]} stroke="#000" tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Line type="monotone" dataKey="taxaRetencao" stroke="#8884d8" name="Retenção" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesDashboard;
