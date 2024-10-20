import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import numeral from 'numeral';
import api from '../../services/api';
import styles from './AreaCharts.module.css';


const AreaBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yDomain, setYDomain] = useState([0, 10000]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/pedidosDashboard');
        console.log('Dados retornados da API:', response.data);

        const data = response.data.items || [];
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        // Somando os dados por mês
        const monthlyData = monthNames.map((month, index) => {
          const monthIndex = index + 1;
          const totalPedidos = data
            .filter(item => new Date(item.data_criacao).getMonth() + 1 === monthIndex)
            .reduce((acc, curr) => acc + curr.peso, 0); // Soma o peso dos pedidos por mês

          return { mes: month, total_vendas: totalPedidos };
        });

        // Definindo o domínio do eixo Y
        const salesValues = monthlyData.map(item => item.total_vendas);
        const minSales = Math.min(...salesValues);
        const maxSales = Math.max(...salesValues);

        setYDomain([minSales, Math.ceil(maxSales * 1.1)]); // Ajusta o domínio para dar espaço no topo
        setChartData(monthlyData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Passa uma dependência vazia para executar o useEffect apenas uma vez

  return (
    <div className={styles['bar-chart']}>
  <div className={styles['bar-chart-info']}>
    <h5 className={styles['bar-chart-title']}>Vendas por Peso (kg)</h5>
    <div className={styles['chart-info-data']}>
      <div className={styles['info-data-value']}></div>
    </div>
  </div>
  <div className={styles['bar-chart-wrapper']}>
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
            <YAxis domain={yDomain} tickCount={6} tickFormatter={(value) => `${value.toFixed(2)} kg`} />
            <Tooltip formatter={(value, name) => [`${numeral(value).format('0,0.00')} kg`, name]} />
            <Area
              type="monotone"
              dataKey="total_vendas"
              name="Peso total dos pedidos"
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
