import { useEffect, useState } from 'react';
import styles from './Cadastros.module.css';
import api from '../../services/api';
import CadastroConcluido from './CadastroConcluido';

function CadastrarEtapas() {
    const [departamentos, setDepartamentos] = useState([]);
    const [showCadastroConcluido, setShowCadastroConcluido] = useState(false);

    const [etapa, setEtapa] = useState({
        nome: '',
        id_departamento: '',
    });

    async function buscarDepartamentos() {
        try {
            const response = await api.get("/departamentos");
            setDepartamentos(response.data);
            console.log(response)
        } catch (error) {
            console.error("Erro ao buscar departamentos:", error);
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
    }, []);
    

    return (
        <div className={styles.pagina}>
            <div className={styles.container}>
                <h1 className={styles.titulo}>Cadastro de Etapas</h1>
                
                <div className={styles.campos}>
                    <label>Nome da Etapa:</label>
                    <input 
                        className={styles.inputTexto} 
                        type="text"
                        name="titulo"
                        placeholder='Nome da Etapa'
                        value={etapa.nome}
                        onChange={(e) => setEtapa({ ...etapa, nome: e.target.value })}
                    />
                </div>

                <div className={styles.campos}>
                
                    <label>Selecione o Departamento responsável:</label>
                    <select
                        className={styles.inputTexto}
                        value={etapa.id_departamento}
                        onChange={(e) => setEtapa({ ...etapa, id_departamento: e.target.value })}
                        >
                        <option>Selecione um departamento</option>
                        {departamentos.map(departamento => (
                            <option 
                                key={departamento.id} 
                                value={departamento.id}
                            > 
                                {departamento.nome}           
                            </option>
                        ))}
                    </select>

                </div>
                <button className={styles.botaoCadastrar} onClick={cadastrarEtapa}>
                    Cadastrar
                </button>
            </div>

            {showCadastroConcluido && (
                <CadastroConcluido onClose={handleCloseCadastroConcluido} />
            )}

        </div>
    );
}

export default CadastrarEtapas;
