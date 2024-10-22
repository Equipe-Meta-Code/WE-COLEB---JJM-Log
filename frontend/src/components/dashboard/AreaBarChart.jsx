import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import api from '../../services/api';
import moment from 'moment';
import 'moment/locale/pt-br'; 

const AreaBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yDomain, setYDomain] = useState([0, 20]); // Defina um valor padrão aqui

  const processChartData = (data) => {
    moment.locale('pt-br');
    
    const mesesEmPortugues = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
  
    const ordersByMonth = data.reduce((acc, order) => {
      const monthIndex = moment(order.data_criacao, 'DD/MM/YYYY').month();
  
      if (!acc[monthIndex]) {
        acc[monthIndex] = { mes: monthIndex, total_pedidos: 0 }; 
      }
      acc[monthIndex].total_pedidos += 1;
      return acc;
    }, {});
  
    return Object.entries(ordersByMonth).map(([mes, valor]) => ({
      mes: mesesEmPortugues[mes], 
      total_pedidos: valor.total_pedidos
    })).sort((a, b) => a.mes - b.mes); 
  };  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/pedidosDashboard');
        const processedData = processChartData(response.data);
        setChartData(processedData);
        setYDomain([0, Math.max(...processedData.map(item => item.total_pedidos), 20)]);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{
      backgroundColor: '#fff',          
      borderRadius: '15px',               
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', 
      padding: '20px',                   
      margin: '20px 0'                   
    }}>
      <div className="bar-chart-info">
        <h5 className="bar-chart-title" style={{ color: '#000' }}>Pedidos por Mês</h5>
        <div className="chart-info-data">
          <div className="info-data-value"></div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height={250}>
          {loading ? (
            <p style={{ color: '#000' }}>Carregando...</p>
          ) : (
            chartData.length > 0 ? (
              <AreaChart
                width={500}
                height={400}
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis 
                  dataKey="mes" 
                  stroke="#000" 
                />
                <YAxis domain={yDomain} tickCount={6} stroke="#000" />
                <Tooltip formatter={(value, name) => [`${value} pedidos`, name]} />
                <Area
                  type="monotone"
                  dataKey="total_pedidos"
                  name="Quantidade de pedidos"
                  stroke="#1E90FF" 
                  fill="rgba(30, 144, 255, 0.5)" 
                  fillOpacity={1}
                />
              </AreaChart>
            ) : (
              <p style={{ color: '#000' }}>Não há dados disponíveis.</p>
            )
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
