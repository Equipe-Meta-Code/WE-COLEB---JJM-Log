import styles from './ListaArquivo.module.css';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RiDeleteBin5Fill, RiDownloadCloudFill } from "react-icons/ri";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../services/api';
import PermissionComponent from "../../components/PermissionComponent/";

function ListaArquivos({tipoDoArquivo}) {
    const navigate = useNavigate();
    const { tipo } = useParams();
    const location = useLocation();
    const userId = location.state?.userId;
    const origem = location.state?.origem;
    const [funcionario, setFuncionario] = useState(null);

    console.log("User:", userId, "origem:", origem)
    
    const [arquivos, setArquivos] = useState([]);
    const [tipoArquivo, setTipoArquivo] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    async function buscarArquivos() {
        try {
            const response = await api.get("/arquivos");
            setArquivos(response.data);
        } catch (error) {
            console.error("Erro ao buscar arquivos:", error);
        }
    }

    useEffect(() => {
        buscarArquivos(); 
        if (tipo == 1) {
            setTipoArquivo("Holerites");
        } else if (tipo == 2) {
            setTipoArquivo("Registro de Ponto");
        } else {
            setTipoArquivo("Atestado");
        }
    }, [tipo]);

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

    const botaoVoltar = () => {
        navigate("/portalFuncionario", { state: { userId, origem } });
    };

    const visualizarArquivo = (arquivo) => {

        const url = `http://localhost:3333/uploads/pdf/${arquivo.rota}`;
        
        const link = document.createElement('a');
        link.href = url;
        link.download = arquivo.nome;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const apagarArquivo = async (arquivoId) => {
        event.stopPropagation();
    
        try {
            await api.delete(`/arquivos/${arquivoId}`);
            console.log(`Arquivo ${arquivoId} apagado com sucesso`);
        
            setArquivos(prevArquivos => prevArquivos.filter(arquivo => arquivo.id !== arquivoId));
        } catch (error) {
            console.error("Erro ao apagar o arquivo:", error);
        }
    };
    
    
    


    

    const baixarArquivo = async (arquivo) => {
        event.stopPropagation();
        const url = `http://localhost:3333/uploads/pdf/${arquivo.rota}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro ao baixar o arquivo");
            }
    
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', arquivo.nome);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error("Erro ao baixar o arquivo:", error);
        }
    };
    
    
    

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; 
        const formData = new FormData();
        console.log(file)
        if (!file) {
            console.error("Nenhum arquivo selecionado.");
            return;
        }


        formData.append('pdf', file);
        formData.append('userId', userId);
        formData.append('origem', origem);
        formData.append('tipo', tipoArquivo);
        console.log("enviando pro banco", userId, origem)
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
        buscarArquivos();
    };

    const arquivosFiltrados = arquivos
        .filter(arquivo => arquivo.tipo === tipoArquivo && arquivo.user_id == userId)
        .filter(arquivo => arquivo.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    
    console.log("Filtrado",arquivosFiltrados, "userId", userId);
    console.log("sem filtro",arquivos, "userId", userId);

    return (
        <div>
            <button className={styles.botaoVoltar} onClick={botaoVoltar}>
                <IoArrowBackCircleOutline />Voltar
            </button>
            <h1 className={styles.titulo}>
                {tipoArquivo} 
                <span className={styles.nomeDestaque}>
                    {funcionario ? ` de ${funcionario.nome}` : ' Usuário não encontrado...'}
                </span>

            </h1>

            <input
                className={styles.filtro}
                placeholder='Pesquise o nome do arquivo'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {(tipoArquivo === 'Holerites' || tipoArquivo === 'Registro de Ponto') ? (
                <PermissionComponent role="Rh_Role">
                    <label htmlFor="atestado-upload" className="upload-button small-button">Fazer Upload</label>
                    <input
                        type="file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        id="atestado-upload"
                    />
                </PermissionComponent>
            ) : (
                <>
                    <label htmlFor="atestado-upload" className="upload-button small-button">Fazer Upload</label>
                    <input
                        type="file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        id="atestado-upload"
                    />
                </>
            )}




            <div className={styles.container}>
            {arquivosFiltrados.map((arquivo) => {
                const dataFormatada = new Date(arquivo.data_criacao).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                const nomeArquivoCurto = arquivo.nome.length > 30
                    ? `${arquivo.nome.substring(0, 30)}...`
                    : arquivo.nome;

                return (
                    <div className={styles.card} key={arquivo.id} onClick={() => visualizarArquivo(arquivo)}>
                        <div className={styles.botoes}>
                            <RiDeleteBin5Fill
                                className={styles.botaoApagar}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    apagarArquivo(arquivo.id);
                                }}
                            />
                            <RiDownloadCloudFill
                                className={styles.botaoDownload}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    baixarArquivo(arquivo, event);
                                }}
                            />
                        </div>

                        <div className={styles.conteudoCard}>
                            <img src="/src/assets/file_icon.png" alt="Arquivos" className={styles.imagem} />
                        </div>

                        <div className={styles.texto}>
                            <p className={styles.nomeArquivo}>{nomeArquivoCurto}</p>
                            <p className={styles.dataArquivo}>{dataFormatada}</p>
                        </div>
                    </div>
                );
            })}



            </div>
        </div>
    );
}

export default ListaArquivos;
