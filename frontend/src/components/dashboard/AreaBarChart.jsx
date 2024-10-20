import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import api from '../../services/api';
import styles from './AreaCharts.module.css';
import moment from 'moment';

const AreaBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yDomain, setYDomain] = useState([0, 1000]);

  // Função para processar os dados e contar os pedidos por mês
  const processChartData = (data) => {
    const ordersByMonth = data.reduce((acc, order) => {
      const month = moment(order.data_criacao, 'DD/MM/YYYY').format('MM/YYYY');
      if (!acc[month]) {
        acc[month] = { mes: month, total_pedidos: 0 };
      }
      acc[month].total_pedidos += 1;
      return acc;
    }, {});

    // Transforma o objeto em array e ordena pelos meses
    return Object.values(ordersByMonth).sort((a, b) => {
      return moment(a.mes, 'MM/YYYY') - moment(b.mes, 'MM/YYYY');
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/pedidosDashboard');
        const processedData = processChartData(response.data);
        setChartData(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Quantidade de Pedidos por Mês</h5>
        <div className="chart-info-data">
          <div className="info-data-value"></div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          {loading ? (
            <p>Carregando...</p>
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={yDomain} tickCount={6} />
                <Tooltip formatter={(value, name) => [`${value} pedidos`, name]} />
                <Area
                  type="monotone"
                  dataKey="total_pedidos"
                  name="Quantidade de pedidos"
                  stroke="#a9dfd8"
                  fill="#a9dfd8"
                />
              </AreaChart>
            ) : (
              <p>Não há dados disponíveis.</p>
            )
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );  
};

export default AreaBarChart;
