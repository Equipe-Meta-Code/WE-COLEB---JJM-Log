import { useEffect, useState } from 'react';
import styles from './Departamentos.module.css';
import api from '../../services/api';
import Edicao from '../modal/Edicao';

function Departamentos() {
    const [departamentos, setDepartamentos] = useState([]);
    const [etapas, setEtapas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [etapaEditada, setEtapaEditada] = useState(null);

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

    function mostrarModal(id, nome, departamento_id, departamento_nome) {
        setEtapaEditada({ id, nome, departamento_id, departamento_nome });
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

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
                                <button>x</button>
                                <p className={styles.etapa}>{etapa.nome}</p>

                                <div className={styles.botoes}>
                                    <button onClick={() => deletarEtapa(etapa.id)}>Remover</button>
                                    <button onClick={() => mostrarModal(etapa.id, etapa.nome, etapa.departamento.id, etapa.departamento.nome)}>Editar</button>
                                    <button>Ordem</button>
                                </div>
                            </div>
                        ))}
                    <button>Cadastrar nova Etapa</button>
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
