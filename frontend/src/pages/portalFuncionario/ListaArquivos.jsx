import styles from './ListaArquivo.module.css';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RiDeleteBin5Fill, RiDownloadCloudFill } from "react-icons/ri";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../services/api';


function ListaArquivos({tipoDoArquivo}) {
    const navigate = useNavigate();
    const { tipo } = useParams();
    const location = useLocation();
    const userId = location.state?.userId;
    const origem = location.state?.origem;

    console.log("User:", userId, "origem:", origem)
    
    const [arquivos, setArquivos] = useState([]);
    const [tipoArquivo, setTipoArquivo] = useState("");

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

    const botaoVoltar = () => {
        navigate(`/portalFuncionario`);
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
        event.stopPropagation(); // Previne a execução do clique no card
    
        try {
            // Faz a requisição DELETE para o servidor
            await api.delete(`/arquivos/${arquivoId}`);
            console.log(`Arquivo ${arquivoId} apagado com sucesso`);
        
            // Após deletar, atualiza a lista de arquivos removendo o apagado
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
            link.setAttribute('download', arquivo.nome);  // Define o nome do arquivo a ser baixado
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            // Libera o objeto URL após o uso
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
        buscarArquivos()
    };

    const arquivosFiltrados = arquivos.filter(arquivo => 
        arquivo.tipo === tipoArquivo && arquivo.user_id == userId
      );
    console.log("Filtrado",arquivosFiltrados, "userId", userId)
    console.log("sem filtro",arquivos, "userId", userId)

    return (
        <div>
            <button className={styles.botaoVoltar} onClick={botaoVoltar}>
                <IoArrowBackCircleOutline />Voltar
            </button>
            <h1 className={styles.titulo}>{tipoArquivo}</h1>

            <input
                className={styles.filtro}
                placeholder='Pesquise o nome do arquivo'
            />

            <label htmlFor="atestado-upload" className="upload-button small-button">Fazer Upload</label>
            <input
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                id="atestado-upload"
            />

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
                                    event.stopPropagation(); // Previne o clique no card
                                    apagarArquivo(arquivo.id);
                                }}
                            />
                            <RiDownloadCloudFill
                                className={styles.botaoDownload}
                                onClick={(event) => {
                                    event.stopPropagation(); // Previne o clique no card
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
