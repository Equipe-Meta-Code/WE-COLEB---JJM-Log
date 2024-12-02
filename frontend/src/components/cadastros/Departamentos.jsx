import { useEffect, useState } from 'react';
import styles from './Departamentos.module.css';
import api from '../../services/api';
import Edicao from '../modal/Edicao';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Departamentos() {
    const [departamentos, setDepartamentos] = useState([]);
    const [etapas, setEtapas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [etapaEditada, setEtapaEditada] = useState(null);
    const navigate = useNavigate();

    async function buscarDepartamentos() {
        try {
            const response = await api.get("/departamentos");
            setDepartamentos(response.data);
            console.log(response);
        } catch (error) {
            console.error("Erro ao buscar departamentos:", error);
        }
    }
 
    async function buscarEtapas() {
        try {
            const response = await api.get("/etapas");
            setEtapas(response.data);
        } catch (error) {
            console.error("Erro ao buscar etapas:", error);
        }
    }
 
    async function deletarEtapa(id) {
        try {
            await api.delete(`/etapas/${id}`);
            setEtapas(etapas.filter((etapa) => etapa.id !== id));
        } catch (error) {
            console.error("Erro ao deletar etapa:", error);
        }
    }
 
    async function editarFixo(etapa) {
        try {
            const novoValorFixo = etapa.fixo === "Sim" ? "Não" : "Sim";
            await api.put(`/etapasFixo/${etapa.id}`, { fixo: novoValorFixo });
           
            // Atualiza o estado local com o novo valor de 'fixo' (opcional)
            setEtapas(etapas.map(e => e.id === etapa.id ? { ...e, fixo: novoValorFixo } : e));
        } catch (error) {
            console.error("Erro ao editar o campo fixo da etapa:", error);
        }
    }
 
    function mostrarModal(id, nome, departamento_id, departamento_nome) {
        setEtapaEditada({ id, nome, departamento_id, departamento_nome });
        setShowModal(true);
    }
 
    function handleCloseModal() {
        setShowModal(false);
    }

    const botaoCadastrar = () => {
        navigate("/Cadastro/Etapas");
    };
 
    useEffect(() => {
        buscarDepartamentos();
        buscarEtapas();
 
        const intervalId = setInterval(() => {
            buscarDepartamentos();
            buscarEtapas();
        }, 1000);
 
 
        return () => clearInterval(intervalId);
    }, []);
 
    return (
        <div className={styles.pagina}>
            {departamentos.map((departamento) => (
                <div key={departamento.id} className={styles.container}>
                    <h1 className={styles.titulo}>{departamento.nome}</h1>
                   
                    {etapas.filter(etapa => etapa.departamento.id === departamento.id)
                        .map((etapa) => (
                            <div key={etapa.id} className={styles.etapas}>
 

{/*                                 <label className={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={etapa.fixo === "Sim"}
                                        onChange={() => editarFixo(etapa)}
                                    />
                                    <span className={styles.customCheckbox}></span>
                                </label> */}
 
                                <p className={styles.etapa}>{etapa.nome}</p>
 
                                <div className={styles.botoes}>
                                    <MdDelete
                                        className={styles.botaoApagar}
                                        onClick={() => deletarEtapa(etapa.id)}
                                    />
                                   {/*  <button onClick={() => mostrarModal(etapa.id, etapa.nome, etapa.departamento.id, etapa.departamento.nome)}>Editar</button>
                                    <button>Ordem</button> */}
                                </div>
                            </div>
                    ))}
 
 
                    <button 
                        className={styles.botaoCadastrar}
                        onClick={botaoCadastrar}
                    >
                        Cadastrar nova Etapa
                    </button>
                </div>
            ))}
 
            {showModal && (
                <>
                    <div className={styles['blur-background']} onClick={handleCloseModal}></div>
                    <div className={styles.modal}>
                        <Edicao
                            id={etapaEditada.id}
                            nome={etapaEditada.nome}
                            departamento_id={etapaEditada.departamento_id}
                            departamento_nome={etapaEditada.departamento_nome}
                            onClose={handleCloseModal}
                        />
                    </div>
                </>
            )}
 
        </div>
    );
}
 
export default Departamentos;