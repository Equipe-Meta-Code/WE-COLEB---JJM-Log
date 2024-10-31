import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import api from '../../services/api';
import moment from 'moment';
import 'moment/locale/pt-br';

const AreaBarChart = () => {
  const [originalData, setOriginalData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [modalError, setModalError] = useState('');

  const processChartData = (data, start, end) => {
    moment.locale('pt-br');
    const mesesEmPortugues = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const startMoment = start ? moment(start, 'YYYY-MM-DD') : null;
    const endMoment = end ? moment(end, 'YYYY-MM-DD') : null;

    const filteredData = data.filter(order => {
      const orderDate = moment(order.data_criacao, 'DD/MM/YYYY');
      return (!startMoment || orderDate.isSameOrAfter(startMoment)) &&
        (!endMoment || orderDate.isSameOrBefore(endMoment));
    });

    const ordersByMonth = Array.from({ length: 12 }, (_, index) => ({
      mes: mesesEmPortugues[index],
      total_pedidos: 0,
    }));

    filteredData.forEach(order => {
      const monthIndex = moment(order.data_criacao, 'DD/MM/YYYY').month();
      ordersByMonth[monthIndex].total_pedidos += 1;
    });

    return ordersByMonth;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/pedidosDashboard');
      setOriginalData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const processedData = processChartData(originalData, startDate, endDate);
    setChartData(processedData);
  }, [originalData, startDate, endDate]);

  const maxPedidos = Math.max(...chartData.map(item => item.total_pedidos), 0);
  const yDomain = [0, maxPedidos + Math.round(maxPedidos * 0.1)];

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (endDate && newStartDate > endDate) {
      setModalError('A data inicial não pode ser maior que a data final.');
      return;
    }
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (startDate && newEndDate < startDate) {
      setModalError('A data final não pode ser menor que a data inicial.');
      return;
    }
    setEndDate(newEndDate);
  };

  const closeModal = () => setModalError('');

  // Função para formatar os ticks do eixo Y
  const formatYAxisTicks = (value) => {
    return Math.floor(value); // Reduz para o número inteiro mais próximo
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      padding: '20px',
      margin: '20px 0'
    }}>
      <h2 style={{
        fontSize: '24px',
        color: '#000',
        textAlign: 'center',
        marginBottom: '10px'
      }}>
        Pedidos por Mês
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '15px'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', color: '#000' }}>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            style={{ padding: '5px' }}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', color: '#000' }}>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            style={{ padding: '5px' }}
          />
        </label>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div className="bar-chart-wrapper">
          <ResponsiveContainer width="100%" height={250}>
            {loading ? (
              <p style={{ color: '#000', textAlign: 'center' }}>Carregando...</p>
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
                  <XAxis dataKey="mes" stroke="#000" />
                  <YAxis domain={yDomain} tickCount={6} tickFormatter={formatYAxisTicks} stroke="#000" />
                  <Tooltip formatter={(value, name) => [`${value} pedidos`, name]} />
                  <Area
                    type="monotone"
                    dataKey="total_pedidos"
                    name="Quantidade de pedidos"
                    stroke="#336184"
                    fill="rgba(51,97,132,0.8)"
                    fillOpacity={1}
                  />
                </AreaChart>
              ) : (
                <p style={{ color: '#000', textAlign: 'center' }}>Não há dados disponíveis.</p>
              )
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {modalError && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            maxWidth: '300px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <svg width="78" height="75" fill="#F5A623" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              <p style={{ color: '#000', marginTop: '10px', fontSize: '16px', textAlign: 'center' }}>{modalError}</p>
            </div>
            <button
              onClick={() => closeModal()}
              style={{
                marginTop: '15px',
                padding: '12px 24px',
                fontSize: '16px',      
                backgroundColor: '#336184',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Fechar
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default AreaBarChart;
