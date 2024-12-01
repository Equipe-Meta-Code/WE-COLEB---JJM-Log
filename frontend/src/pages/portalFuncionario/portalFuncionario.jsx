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

  //upload imagem no mural de avisos
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return alert("Nenhuma imagem selecionada.");
  
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);
    formData.append("origem", origem);
    formData.append('tipoImg', "Mural de avisos");
    console.log("enviando pro banco", userId, origem)
    
    try {
      const response = await api.post("/upload/image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
      }
    });
      console.log("Resposta do servidor:", response);

      // Atualiza o carrossel com a nova imagem
      const newImage = {
        src: `${response.data.rota}`,
        alt: `Imagem enviada por ${response.data.user_id}`,
      };

      setCarouselImages((prevImages) => [...prevImages, newImage]);
      alert("Imagem adicionada ao carrossel!");
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
  };

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await api.get("/upload/images"); // Rota do backend para buscar imagens
        console.log("Imagens recebidas do backend:", response.data);

        const imagens = response.data.map((img) => ({
          src: img.url, 
          alt: img.nome,
        }));

        setCarouselImages(imagens);
      } catch (error) {
        console.error("Erro ao carregar imagens no mural de avisos:", error);
      }
    };

    fetchCarouselImages();
  }, []);

  const [carouselImages, setCarouselImages] = useState([]);

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

        {/* Botão de Upload */}
        <div className="upload-btn-wrapper">
          <label htmlFor="upload-carousel" className="upload-label">
            Upload Imagem
          </label>
          <input
            id="upload-carousel"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleUploadImage}
          />
        </div>

        <div className="carousel-inner">
          {carouselImages.length > 0 ? (
            carouselImages.map((img, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={img.src} className="d-block w-100" alt={img.alt} />
              </div>
            ))
          ) : (
            //imagem padrão enquanto não há nenhuma imagem no banco
            <div className="carousel-item active">
            <img 
              src="/src/assets/morango.jpg"
              className="d-block w-100" 
              alt="Imagem padrão do mural" 
            />
          </div>
          )}
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
