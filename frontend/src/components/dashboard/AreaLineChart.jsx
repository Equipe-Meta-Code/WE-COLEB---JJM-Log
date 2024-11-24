import React, { useState } from 'react';
import AdmChart from './AdmChart';
import FinanceChart from './FinanceChart';
import OperationalChart from './OperationalChart';
import RhChart from './RhChart';

const AreaLineChart = () => {
  const [departamento, setDepartamento] = useState("ADM");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Função para renderizar o gráfico com base no departamento
  const renderChart = () => {
    switch (departamento) {
      case 'ADM':
        return <AdmChart startDate={startDate} endDate={endDate} />;
      case 'FINANCEIRO':
        return <FinanceChart startDate={startDate} endDate={endDate} />;
      case 'OPERACIONAL':
        return <OperationalChart startDate={startDate} endDate={endDate} />;
      case 'RH':
        return <RhChart startDate={startDate} endDate={endDate} />;
      default:
        return null;
    }
  };

  // Função para lidar com a alteração de datas
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '20px', margin: '20px 0' }}>
      <h2 style={{ textAlign: 'center' }}>Gráficos por Departamento</h2>

      <div style={{ marginBottom: '15px', textAlign: 'center' }}>
        <label htmlFor="departamento">Selecione o Departamento: </label>
        <select
          id="departamento"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="ADM">Administrativo</option>
          <option value="FINANCEIRO">Financeiro</option>
          <option value="OPERACIONAL">Operacional</option>
          <option value="RH">Recursos Humanos</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
        <div style={{ marginRight: '10px' }}>
          <label>Data Início:</label>
          <input
            type="date"
            name="startDate"
            value={startDate || ''}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label>Data Fim:</label>
          <input
            type="date"
            name="endDate"
            value={endDate || ''}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {/* Renderiza o gráfico selecionado com os filtros de data */}
      {renderChart()}
    </div>
  );
};

export default AreaLineChart;
