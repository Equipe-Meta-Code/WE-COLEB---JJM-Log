import React, { useEffect, useState } from 'react';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../../services/api';
import moment from 'moment';
import 'moment/locale/pt-br'; 

const AreaLineChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [yDomain, setYDomain] = useState([0, 20]);

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
      <div className="line-chart-info">
        <h5 className="line-chart-title" style={{ color: '#000' }}>Pedidos por Mês</h5>
      </div>
      <div className="line-chart-wrapper">
        {loading ? (
          <p style={{ color: '#000' }}>Carregando...</p>
        ) : error ? (
          <p style={{ color: '#000' }}>Erro ao carregar os dados.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="mes" stroke="#000" />
              <YAxis domain={yDomain} tickCount={6} stroke="#000" tickFormatter={(value) => value.toLocaleString('pt-BR')} />
              <Tooltip formatter={(value, name) => [`${value}`, 'Pedidos']} />
              {chartData.length === 0 && (
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                >
                  Não há dados para exibir no gráfico.
                </text>
              )}
              <Line
                type="monotone"
                dataKey="total_pedidos"
                name="Quantidade de pedidos"
                stroke="#336184" 
                fill="rgba(51,97,132,0.8)" 
                fillOpacity={1}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AreaLineChart;
