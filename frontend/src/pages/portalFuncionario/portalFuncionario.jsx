import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

function PortalFuncionario() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/outra-pagina');
  };

  return (
    <>
        <h1 className="titulo">Portal do funcionário</h1>
        <h3 className="titulo-seg">Bem-vindo ao portal do funcionário</h3>
        <h4 className="titulo-seg">Utilize o portal para checar seus holerites, registro de ponto, atestados e
            armazenar arquivos importantes para a empresa.
        </h4>
        <div className="pasta-div">
            <div className="arquivo-div" onClick={handleClick}>
                <img src="/src/assets/holerite.png" alt="Arquivos" className="image" />
                <h2 className="nome-pasta">Holerites</h2>
            </div>
            <div className="arquivo-div" onClick={handleClick}>
                <img src="/src/assets/registroPonto.png" alt="Arquivos" className="image" />
                <h2 className="nome-pasta">Registro de ponto</h2>
            </div>
            <div className="arquivo-div" onClick={handleClick}>
                <img src="/src/assets/atestado.png" alt="Arquivos" className="image-atestado" />
                <h2 className="nome-pasta">Atestado</h2>
            </div>
        </div>
    </>
  );
};

export default PortalFuncionario;
