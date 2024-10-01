import { useEffect, useState } from 'react';
import styles from './Departamentos.module.css';
import api from '../../services/api';
import CadastroConcluido from './CadastroConcluido';

function Departamentos() {
    const [departamentos, setDepartamentos] = useState([]);
    const [etapas, setEtapas] = useState([]);
    const [showCadastroConcluido, setShowCadastroConcluido] = useState(false);

/*     const [etapa, setEtapa] = useState({
        nome: '',
        id_departamento: '',
    }); */

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

    async function cadastrarEtapa() {
        try {
            console.log(etapa);
            const response = await api.post("/etapas", {
                nome: etapa.nome,
                id_departamento: etapa.id_departamento,
            });
            setShowCadastroConcluido(true);
            setEtapa({
                nome: '',
                id_departamento: '',
            });
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    }

    function handleCloseCadastroConcluido() {
        setShowCadastroConcluido(false);
    }

    useEffect(() => {
        buscarDepartamentos();
        buscarEtapas();
    }, []);

    return (
        <div className={styles.pagina}>
            {departamentos.map((departamento) => (
                <div key={departamento.id} className={styles.container}>
                    <h1 className={styles.titulo}>{departamento.nome}</h1>
                    {etapas
                        .filter(etapa => etapa.departamento.id === departamento.id) // Filtra as etapas pelo departamento
                        .map((etapa) => (
                            <div key={etapa.id}>
                                <p>{etapa.nome}</p> {/* Mostra o nome da etapa */}
                            </div>
                        ))}
                </div>
            ))}

            {showCadastroConcluido && (
                <CadastroConcluido onClose={handleCloseCadastroConcluido} />
            )}
        </div>
    );
}

export default Departamentos;
