import React, { useEffect, useState, useContext } from 'react';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import styles from './AreaCharts.module.css';

const AreaLineChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [yDomain, setYDomain] = useState([0, 10000]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        // Presume-se que a permissão seja verificada de outra forma
        // ou remova isso se não for necessário
        response = await api.get('/pedidosDashboard');
        console.log('Dados retornados da API:', response.data);

        const data = response.data.items || []; // Verifique se há uma propriedade `items`, por exemplo

        if (Array.isArray(data)) {
          // Aqui você pode processar os dados conforme necessário.
          const processedData = data.map(item => ({
            month: item.month, // Supondo que os meses estejam no item
            total_pedidos: item.total_pedidos, // Supondo que o total de pedidos seja retornado
          }));
          setChartData(processedData);
        } else {
          console.error('Erro: A resposta da API não contém um array válido.', response.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Passa uma dependência vazia para executar o useEffect apenas uma vez

  return (
    <div className={styles['line-chart']}>
    <div className={styles['line-chart-info']}>
      <h5 className={styles['line-chart-title']}>Pedidos por Mês</h5>
    </div>
    <div className={styles['line-chart-wrapper']}>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Erro ao carregar os dados.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 40,
              left: 20,
              bottom: 20,
            }}
          >
            <XAxis dataKey="month" />
            <YAxis domain={yDomain} tickCount={6} tickFormatter={(value) => value.toLocaleString('pt-BR')} />
            <Tooltip formatter={(value, name) => [`${value}`, 'Pedidos']} />
            {chartData.length === 0 && (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
              >
                Não há dados para exibir no gráfico.
              </text>
            )}
            <Line
              type="monotone"
              dataKey="total_pedidos"
              name="Total Pedidos"
              stroke="#fcb859"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  </div>
  );
};

export default AreaLineChart;
