import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importando o idioma português para o moment
import api from '../../services/api';

const FinanceChart = ({ startDate, endDate }) => {
  const [dadosFinanceiro, setDadosFinanceiro] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/pedidosDashboard");

        // Agrupando lucros por mês e somando valores
        const dadosAgrupados = response.data.reduce((acc, item) => {
          const dataCriacao = moment(item.data_criacao, "DD/MM/YYYY");
          const mesAno = dataCriacao.locale('pt-br').format("MMM YYYY"); // Formatar em português
          const lucro = item.lucro;

          if (!acc[mesAno]) {
            acc[mesAno] = { mes: mesAno, lucro: 0 };
          }
          acc[mesAno].lucro += lucro;
          return acc;
        }, {});

        // Criar uma lista de meses entre startDate e endDate
        const meses = [];
        const start = startDate
          ? moment(startDate)
          : moment.min(response.data.map(item => moment(item.data_criacao, "DD/MM/YYYY")));
        const end = endDate
          ? moment(endDate)
          : moment.max(response.data.map(item => moment(item.data_criacao, "DD/MM/YYYY")));

        for (let m = start.clone(); m.isBefore(end.clone().add(1, 'months')); m.add(1, 'months')) {
          const mesAno = m.locale('pt-br').format("MMM YYYY");
          meses.push({ mes: mesAno, lucro: dadosAgrupados[mesAno] ? dadosAgrupados[mesAno].lucro : 0 });
        }

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
    <div>
      <h3>Evolução do Lucro Mensal</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dadosFinanceiro} margin={{ top: 20, right: 30, left: 70, bottom: 0 }}>
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
    </div>
  );
};

export default FinanceChart;
