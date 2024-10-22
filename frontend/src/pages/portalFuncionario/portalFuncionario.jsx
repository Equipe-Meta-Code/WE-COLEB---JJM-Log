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
/*   try {
    const response = await api.post("http://localhost:3333/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log(response.data); // Exibe a resposta do backend
} */

    const handleFileUpload = async (event, type) => {
      const file = event.target.files[0]; // Aqui você garante que o arquivo foi selecionado
      const formData = new FormData();
    
      if (!file) {
        console.error("Nenhum arquivo selecionado.");
        return;
      }
    
      const userId = 123; // Certifique-se de que este ID está correto
      const origem = 1;
    
      formData.append('pdf', file);
      formData.append('userId', userId);
      formData.append('origem', origem);
    
      try {
        const response = await api.post("/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        console.log("Resposta do servidor:", response);
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
      }
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
          <label htmlFor="holerite-upload" className="upload-button small-button">Fazer Upload</label>
          <input
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={(event) => handleFileUpload(event, 'Holerites')}
            id="holerite-upload"
          />
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
          <label htmlFor="registroPonto-upload" className="upload-button small-button">Fazer Upload</label>
          <input
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={(event) => handleFileUpload(event, 'Registro de ponto')}
            id="registroPonto-upload"
          />
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
          <label htmlFor="atestado-upload" className="upload-button small-button">Fazer Upload</label>
          <input
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={(event) => handleFileUpload(event, 'Atestado')}
            id="atestado-upload"
          />
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
