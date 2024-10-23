import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 
import api from '../../services/api';

function PortalFuncionario() {
  const navigate = useNavigate();

  const [holerites, setHolerites] = useState([]);
  const [registrosPonto, setRegistrosPonto] = useState([]);
  const [atestados, setAtestados] = useState([]);

  const handleClick = (type) => {
    const tipoArquivo = type; // Armazena o tipo que será passado
    navigate(`/arquivos/${tipoArquivo}`);
  };
  
  return (
    <>
      <h1 className="titulo">Portal do funcionário</h1>
      <h3 className="titulo-seg">Bem-vindo ao portal do funcionário</h3>
      <h4 className="titulo-seg">
        Utilize o portal para checar seus holerites, registro de ponto, atestados e armazenar arquivos importantes para a empresa.
      </h4>

      <div className="pasta-div">
        {/* Holerites */}
        <div className='div-img'>
          <div className="arquivo-div" onClick={() => handleClick('1')}>
            <img src="/src/assets/holerite.png" alt="Arquivos" className="image" />
            <h2 className="nome-pasta">Holerites</h2>
          </div>
          
          <ul>
            {holerites.map((file, index) => (
              <li key={index}>{file.rota}</li>
            ))}
          </ul>
        </div>

        {/* Registro de ponto */}
        <div className='div-img'>
          <div className="arquivo-div" onClick={() => handleClick('2')}>
            <img src="/src/assets/registroPonto.png" alt="Arquivos" className="image" />
            <h2 className="nome-pasta">Registro de ponto</h2>
          </div>
          
          <ul>
            {registrosPonto.map((file, index) => (
              <li key={index}>{file.rota}</li>
            ))}
          </ul>
        </div>

        {/* Atestados */}
        <div className='div-img'>
          <div className="arquivo-div" onClick={() => handleClick('3')}>
            <img src="/src/assets/atestado.png" alt="Arquivos" className="image-atestado" />
            <h2 className="nome-pasta">Atestado</h2>
          </div>
          
          <ul>
            {atestados.map((file, index) => (
              <li key={index}>{file.rota}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PortalFuncionario;
