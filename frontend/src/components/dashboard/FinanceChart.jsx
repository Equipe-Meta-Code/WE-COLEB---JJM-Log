import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';
import 'moment/locale/pt-br';
import api from '../../services/api';

const FinanceChart = ({ startDate, endDate }) => {
  const [dadosFinanceiro, setDadosFinanceiro] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/pedidosDashboard");

        console.log("Dados da API:", response.data); // Verifique os dados da API

        // Agrupando lucros por mês e somando valores
        const dadosAgrupados = response.data.reduce((acc, item) => {
          const dataCriacao = moment(item.data_criacao, "DD/MM/YYYY");
          const mesAno = dataCriacao.format("MMM YYYY");
          const lucro = item.lucro;

          // Adiciona o lucro ao mês correspondente
          if (!acc[mesAno]) {
            acc[mesAno] = { mes: mesAno, lucro: 0 };
          }
          acc[mesAno].lucro += lucro;
          return acc;
        }, {});

        console.log("Dados agrupados:", dadosAgrupados); // Verifique os dados agrupados

        // Criar uma lista de meses entre startDate e endDate
        const meses = [];
        const start = startDate ? moment(startDate) : moment.min(response.data.map(item => moment(item.data_criacao, "DD/MM/YYYY")));
        const end = endDate ? moment(endDate) : moment.max(response.data.map(item => moment(item.data_criacao, "DD/MM/YYYY")));

        // Cria a lista de meses
        for (let m = start.clone(); m.isBefore(end.clone().add(1, 'months')); m.add(1, 'months')) {
          const mesAno = m.format("MMM YYYY");
          // Preenche o mês com o lucro correspondente ou 0 se não houver dados
          meses.push({ mes: mesAno, lucro: dadosAgrupados[mesAno] ? dadosAgrupados[mesAno].lucro : 0 });
        }

        console.log("Dados para o gráfico:", meses); // Verifique os dados que serão passados para o gráfico

        setDadosFinanceiro(meses);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFinanceiro} margin={{ top: 10, right: 30, left: 70, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="mes" stroke="#000" />
        <YAxis
          label={{
            value: 'Lucro (R$)',
            angle: -90,
            position: 'insideLeft',
            dy: 50,
            dx: -30,
          }}
          stroke="#000"
          tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
        />
        <Tooltip
          formatter={(value, name) => [`R$ ${value.toLocaleString('pt-BR')}`, name]}
        />
        <Line type="monotone" dataKey="lucro" stroke="#336184" fill="rgba(51,97,132,0.8)" fillOpacity={1} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FinanceChart;