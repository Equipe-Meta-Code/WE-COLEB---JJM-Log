import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';
import api from '../../services/api';

const mesesEmPortugues = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

const AdmChart = ({ startDate, endDate }) => {
  const [dadosAdm, setDadosAdm] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/clientesDashboard');
        const clientes = response.data;

        // Agrupar os novos clientes por mês
        const groupedData = {};
        clientes.forEach(cliente => {
          const month = moment(cliente.data_criacao).format('MMM');
          if (groupedData[month]) {
            groupedData[month]++;
          } else {
            groupedData[month] = 1;
          }
        });

        // Transformar o objeto em um array e garantir que todos os meses sejam exibidos
        const dadosFormatados = mesesEmPortugues.map(mes => ({
          mes,
          novos_clientes: groupedData[mes] || 0, // Se não houver clientes, atribui 0
          data: moment().month(mes).format('YYYY-MM-DD'), // Adicionando a data correspondente
        }));

        setDadosAdm(dadosFormatados);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Filtragem com todos os meses
  const dadosFiltrados = mesesEmPortugues.map(mes => {
    const dadosMes = dadosAdm.find(item => item.mes === mes);
    return {
      mes,
      novos_clientes: dadosMes ? dadosMes.novos_clientes : 0, // Se não houver dados, atribui 0
      data: moment().month(mes).format('YYYY-MM-DD'), // Adicionando a data correspondente
    };
  }).filter(item => {
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
          domain={[0, 'dataMax + 1']} // Para garantir que o Y comece em 0 e vá até o máximo + 1
            tickFormatter={(tick) => Math.floor(tick)} // Para garantir que os ticks sejam inteiros
        />
        <Tooltip />
        <Line type="monotone" dataKey="novos_clientes" stroke="#336184" fill="rgba(51,97,132,0.8)" fillOpacity={1} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AdmChart;