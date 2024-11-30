import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function PortalFuncionario() {
  const navigate = useNavigate();

  const [holerites, setHolerites] = useState([]);
  const [registrosPonto, setRegistrosPonto] = useState([]);
  const [atestados, setAtestados] = useState([]);

  /* const { userId } = useAuth(); */ // Pegando o userId do contexto
  const location = useLocation();
  const origem = location.state?.origem;
  const userId = location.state?.userId;
  console.log("Id do usuario:", userId); // Log para verificar o userId
  const [funcionario, setFuncionario] = useState(null);



  const handleClick = (type) => {
    const tipoArquivo = type;
    navigate(`/arquivos/${tipoArquivo}`, { state: { userId, origem } });
  };

  console.log("User:", userId, "origem:", origem)

  async function buscarFuncionario() {
    try {
      const response = await api.get(`/usersid/${userId}`);
      setFuncionario(response.data); // Armazena os dados do usuário no estado
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
    }
  }

  useEffect(() => {
    buscarFuncionario();
  }, []);

  return (
    <>
      <h1 className="titulo">{"Bem-vindo ao portal do funcionário de"}
        <span className="nomeDestaque">
          {funcionario ? ` ${funcionario.nome}` : ' Usuário não encontrado...'}
        </span>
      </h1>
      
      <h4 className="titulo-seg">
        Utilize o portal para checar avisos importantes, seus holerites, registro de ponto, atestados e armazenar arquivos importantes para a empresa.
      </h4>

      {/* Mural de avisos */}
      <div id="carouselExampleIndicators" className="carousel slide custom-carousel" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./src/assets/morango.jpg" className="d-block w-100" alt="Morango" />
          </div>
          <div className="carousel-item">
            <img src="./src/assets/kiwi.jpg" className="d-block w-100" alt="Kiwi" />
          </div>
          <div className="carousel-item">
            <img src="./src/assets/manga.jpg" className="d-block w-100" alt="Manga" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


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
