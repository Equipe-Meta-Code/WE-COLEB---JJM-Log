import React, { useState, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';
import 'moment/locale/pt-br';

const AreaLineChart = () => {
  const [departamento, setDepartamento] = useState("ADM");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tituloGrafico, setTituloGrafico] = useState("Gráfico Administrativo");

  const departamentos = [
    { label: 'Administrativo', value: 'ADM' },
    { label: 'Financeiro', value: 'FINANCEIRO' },
    { label: 'Operacional', value: 'OPERACIONAL' },
    { label: 'Recursos Humanos', value: 'RH' },
  ];

  useEffect(() => {
    const departamentoLabel = departamentos.find(dep => dep.value === departamento)?.label;
    setTituloGrafico(`Gráfico ${departamentoLabel || "Selecione um Departamento"}`);
  }, [departamento]);

  const dadosDepartamentos = {
    ADM: [
      { mes: 'Jan', total_pedidos: 15, data: '2024-01-01' },
      { mes: 'Fev', total_pedidos: 18, data: '2024-02-01' },
      { mes: 'Mar', total_pedidos: 12, data: '2024-03-01' },
      { mes: 'Abr', total_pedidos: 20, data: '2024-04-01' },
      { mes: 'Mai', total_pedidos: 25, data: '2024-05-01' },
      { mes: 'Jun', total_pedidos: 17, data: '2024-06-01' },
      { mes: 'Jul', total_pedidos: 23, data: '2024-07-01' },
      { mes: 'Ago', total_pedidos: 14, data: '2024-08-01' },
      { mes: 'Set', total_pedidos: 19, data: '2024-09-01' },
      { mes: 'Out', total_pedidos: 22, data: '2024-10-01' },
      { mes: 'Nov', total_pedidos: 21, data: '2024-11-01' },
      { mes: 'Dez', total_pedidos: 16, data: '2024-12-01' },
    ],
    FINANCEIRO: [
      { mes: 'Jan', fluxo_caixa: 10000, data: '2024-01-01' },
      { mes: 'Fev', fluxo_caixa: 15000, data: '2024-02-01' },
      { mes: 'Mar', fluxo_caixa: 20000, data: '2024-03-01' },
      { mes: 'Abr', fluxo_caixa: 12000, data: '2024-04-01' },
      { mes: 'Mai', fluxo_caixa: 17000, data: '2024-05-01' },
      { mes: 'Jun', fluxo_caixa: 21000, data: '2024-06-01' },
      { mes: 'Jul', fluxo_caixa: 16000, data: '2024-07-01' },
      { mes: 'Ago', fluxo_caixa: 19000, data: '2024-08-01' },
      { mes: 'Set', fluxo_caixa: 18000, data: '2024-09-01' },
      { mes: 'Out', fluxo_caixa: 23000, data: '2024-10-01' },
      { mes: 'Nov', fluxo_caixa: 22000, data: '2024-11-01' },
      { mes: 'Dez', fluxo_caixa: 25000, data: '2024-12-01' },
    ],
    OPERACIONAL: [
      { mes: 'Jan', tempo_entrega: 2, data: '2024-01-01' },
      { mes: 'Fev', tempo_entrega: 1.8, data: '2024-02-01' },
      { mes: 'Mar', tempo_entrega: 2.5, data: '2024-03-01' },
      { mes: 'Abr', tempo_entrega: 1.9, data: '2024-04-01' },
      { mes: 'Mai', tempo_entrega: 2.2, data: '2024-05-01' },
      { mes: 'Jun', tempo_entrega: 1.7, data: '2024-06-01' },
      { mes: 'Jul', tempo_entrega: 2.4, data: '2024-07-01' },
      { mes: 'Ago', tempo_entrega: 2.0, data: '2024-08-01' },
      { mes: 'Set', tempo_entrega: 2.1, data: '2024-09-01' },
      { mes: 'Out', tempo_entrega: 1.8, data: '2024-10-01' },
      { mes: 'Nov', tempo_entrega: 2.3, data: '2024-11-01' },
      { mes: 'Dez', tempo_entrega: 1.9, data: '2024-12-01' },
    ],
    RH: [
      { mes: 'Jan', turnover: 5, data: '2024-01-01' },
      { mes: 'Fev', turnover: 6, data: '2024-02-01' },
      { mes: 'Mar', turnover: 4, data: '2024-03-01' },
      { mes: 'Abr', turnover: 7, data: '2024-04-01' },
      { mes: 'Mai', turnover: 5, data: '2024-05-01' },
      { mes: 'Jun', turnover: 3, data: '2024-06-01' },
      { mes: 'Jul', turnover: 4, data: '2024-07-01' },
      { mes: 'Ago', turnover: 6, data: '2024-08-01' },
      { mes: 'Set', turnover: 5, data: '2024-09-01' },
      { mes: 'Out', turnover: 4, data: '2024-10-01' },
      { mes: 'Nov', turnover: 3, data: '2024-11-01' },
      { mes: 'Dez', turnover: 2, data: '2024-12-01' },
    ],
  };

  const filtrarDadosPorData = (dados) => {
    if (!startDate || !endDate) return dados;
    return dados.filter((item) => {
      const data = moment(item.data);
      return data.isBetween(startDate, endDate, undefined, '[]');
    });
  };

  let dataKey, chartData;

  switch (departamento) {
    case 'ADM':
      dataKey = "total_pedidos";
      chartData = filtrarDadosPorData(dadosDepartamentos.ADM);
      break;
    case 'FINANCEIRO':
      dataKey = "fluxo_caixa";
      chartData = filtrarDadosPorData(dadosDepartamentos.FINANCEIRO);
      break;
    case 'OPERACIONAL':
      dataKey = "tempo_entrega";
      chartData = filtrarDadosPorData(dadosDepartamentos.OPERACIONAL);
      break;
    case 'RH':
      dataKey = "turnover";
      chartData = filtrarDadosPorData(dadosDepartamentos.RH);
      break;
    default:
      chartData = [];
  }

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', padding: '20px', margin: '20px 0' }}>
      <h2 style={{ textAlign: 'center' }}>{tituloGrafico}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ marginLeft: '50px' }}>
          <label htmlFor="departamento">Departamento: </label>
          <select
            id="departamento"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          >
            {departamentos.map((dep) => (
              <option key={dep.value} value={dep.value}>{dep.label}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Data Início:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Data Fim:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="mes" stroke="#000" />
          <YAxis stroke="#000" tickFormatter={(value) => value.toLocaleString('pt-BR')} />
          <Tooltip formatter={(value, name) => [`${value}`, name]} />
          <Line type="monotone" dataKey={dataKey} stroke="#336184" fill="rgba(51,97,132,0.8)" fillOpacity={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaLineChart;