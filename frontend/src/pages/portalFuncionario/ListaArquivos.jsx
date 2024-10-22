import styles from './ListaArquivo.module.css';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ListaArquivos(){
    const navigate = useNavigate();
    const { tipo } = useParams();

    const [tipoArquivo, setTipoArquivo] = useState(false);
    useEffect(() => {
        if (tipo == 1) {
            setTipoArquivo("Holerites");
        } else if (tipo == 2) {
            setTipoArquivo("Registro de Ponto");
        } else {
            setTipoArquivo("Atestado");
        }
    }, [tipo]); 
    const botaoVoltar = (type) => {
        navigate(`/portalFuncionario`);
    };

    return(
        <div >
            <button className={styles.botaoVoltar} onClick={botaoVoltar}><IoArrowBackCircleOutline />Voltar</button>
            <h1 className={styles.titulo}>{tipoArquivo}</h1>
            <input 
                className={styles.filtro}
                placeholder='Pesquise o nome do arquivo'
            />
            <div className={styles.container}>

                <div className={styles.card}>

                    <div className={styles.conteudoCard}>
                        <img src="/src/assets/file_icon.png" alt="Arquivos" className={styles.imagem} />
                    </div>

                    <div className={styles.texto}>
                        <p className={styles.nomeArquivo}>{tipoArquivo}.pdf</p>
                        <p className={styles.dataArquivo}>10/10/2024</p>
                    </div>

                </div>

                <div className={styles.card}>

                    <div className={styles.conteudoCard}>
                        <img src="/src/assets/file_icon.png" alt="Arquivos" className={styles.imagem} />
                    </div>

                    <div className={styles.texto}>
                        <p className={styles.nomeArquivo}>HOLERITEHOLER HOLERITE.pdf</p>
                        <p className={styles.dataArquivo}>10/10/2024</p>
                    </div>

                </div>
               
            </div>
        </div>
    )
}

export default ListaArquivos;