import styles from './ListaArquivo.module.css';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

function ListaArquivos() {
    const navigate = useNavigate();
    const { tipo } = useParams();
    const [arquivos, setArquivos] = useState([]);
    const [tipoArquivo, setTipoArquivo] = useState("");

    // Função para buscar arquivos da API
    async function buscarArquivos() {
        try {
            const response = await api.get("/arquivos");
            setArquivos(response.data); // Atualiza o estado com os dados da API
        } catch (error) {
            console.error("Erro ao buscar arquivos:", error);
        }
    }

    // Define o tipo de arquivo com base no parâmetro da URL
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

    // Função para navegação
    const botaoVoltar = () => {
        navigate(`/portalFuncionario`);
    };

    // Função para baixar o arquivo
    const baixarArquivo = (arquivo) => {
        // Cria o caminho completo para o arquivo no backend
        const url = `http://localhost:3333/uploads/pdf/${arquivo.rota}`; // Ajustado para 'uploads'
        
        // Cria um link de download e clica nele automaticamente
        const link = document.createElement('a');
        link.href = url;
        link.download = arquivo.nome; // Nome do arquivo para download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove o link após o clique
    };
    
    

    // Função para upload de arquivos
    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Aqui você garante que o arquivo foi selecionado
        const formData = new FormData();
        console.log(file)
        if (!file) {
            console.error("Nenhum arquivo selecionado.");
            return;
        }

        const userId = 123; // Certifique-se de que este ID está correto
        const origem = 1;

        formData.append('pdf', file);
        formData.append('userId', userId);
        formData.append('origem', origem);
        formData.append('tipo', tipoArquivo);

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

    // Filtra os arquivos com base no tipo de arquivo
    const arquivosFiltrados = arquivos.filter(arquivo => arquivo.tipo === tipoArquivo);

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
                    <div className={styles.card} key={arquivo.id} onClick={() => baixarArquivo(arquivo)}>
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
