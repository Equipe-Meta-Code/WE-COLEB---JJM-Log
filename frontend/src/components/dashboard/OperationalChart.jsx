import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  ScatterChart, Scatter, LabelList 
} from 'recharts';
import api from '../../services/api';
import moment from 'moment';

const OperationalChart = ({ startDate, endDate }) => {
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);

  const fetchPedidos = async () => {
    try {
      const response = await api.get('/pedidosDashboard');
      if (Array.isArray(response.data)) {
        setPedidos(response.data);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error);
    }
  };

  const filterPedidos = () => {
    let filtered = pedidos;
  
    if (startDate && endDate) {
      const start = moment(startDate, "YYYY-MM-DD"); // Certifique-se de que startDate está no formato correto
      const end = moment(endDate, "YYYY-MM-DD");
      
      filtered = filtered.filter(pedido => {
        const dataCriacao = moment(pedido.data_criacao, "DD/MM/YYYY"); // Ajuste o formato das datas aqui
        return dataCriacao.isBetween(start, end, null, '[]'); // '[]' inclui as datas limite
      });
    }
  
    filtered = filtered.sort((a, b) => (b.total - b.lucro) - (a.total - a.lucro)).slice(0, 10);
    setFilteredPedidos(filtered);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Pedidos Filtrados:", filtered);
  };


  useEffect(() => {
    fetchPedidos();
  }, []);

  useEffect(() => {
    filterPedidos();
  }, [pedidos, startDate, endDate]);

  useEffect(() => {
    setFilteredPedidos(filteredPedidos); // Força atualização para garantir a renderização
  }, [filteredPedidos]);

  const dadosOperacional = filteredPedidos.map(pedido => {
    const tempoEntrega = moment(pedido.data_entrega, "DD/MM/YYYY").diff(moment(pedido.data_criacao, "DD/MM/YYYY"), 'days');
    return {
      nome: pedido.nome,
      tempoEntrega,
      custoTransporte: pedido.total - pedido.lucro,
    };
  });

  const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;
  const formatCurrencyDias = (value) => `${value} dias`;


  return (
    <div>
      <h3>Gráfico de Custo de Transporte por Pedido</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dadosOperacional}  margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="nome" 
            label={{ value: 'Pedidos', position: 'insideBottom', offset: -10 }}  
          />
          <YAxis 
            label={{ value: 'Custo de Transporte (R$)', angle: -90, position: 'insideLeft', dy: 80, dx: -30 }} 
            tickFormatter={(value) => formatCurrency(value)} 
          />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Bar dataKey="custoTransporte" fill="#336184">
            <LabelList dataKey="custoTransporte" position="top" formatter={value => formatCurrency(value)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h3>Relação entre Custo de Transporte e Tempo de Entrega</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 30, right: 30, left: 50, bottom: 50 }}>
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="custoTransporte" 
            name="Custo de Transporte" 
            label={{ value: 'Custo de Transporte (R$)', position: 'insideBottom', offset: -10 }} 
            tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
          />
          <YAxis 
            type="number" 
            dataKey="tempoEntrega" 
            name="Tempo de Entrega" 
            label={{ value: 'Tempo de Entrega (dias)', angle: -90, position: 'insideLeft', dy: 80, dx: -30, }} 
            tickFormatter={(value) => formatCurrencyDias(value)} 
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'Tempo de Entrega') return [`${value} dias`, 'Tempo de Entrega'];
              return [formatCurrency(value), 'Custo de Transporte'];
            }} 
          />
          <Scatter name="Pedidos" data={dadosOperacional} fill="#ff7300">
            <LabelList dataKey="nome" position="top" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OperationalChart;
