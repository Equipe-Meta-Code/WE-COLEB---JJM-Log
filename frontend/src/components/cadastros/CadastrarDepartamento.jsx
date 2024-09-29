import { useState } from 'react';
import styles from './Cadastros.module.css';
import api from '../../services/api';
import CadastroConcluido from './CadastroConcluido';

function CadastrarDepartamentos() {
    const [nome, setDepartamento] = useState('');
    const [showCadastroConcluido, setShowCadastroConcluido] = useState(false);

    async function cadastrarDepartamento() {
        console.log("Cadastrar Departamento");
        console.log(nome);

        try {
            const response = await api.post("/departamentos", {
                nome,
            });

            console.log(response);

            setShowCadastroConcluido(true);
            setDepartamento('');
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    }

    function handleCloseCadastroConcluido() {
        setShowCadastroConcluido(false);
    }

    return (
        <div className={styles.pagina}>
            <div className={styles.container}>
                <h1 className={styles.titulo}>Cadastro de Departamentos</h1>
                <div className={styles.campos}>

                    <label>Nome do Departamento:</label>
                    <input
                        className={styles.inputTexto} 
                        type="text"
                        name="titulo"
                        placeholder='Nome do Departamento'
                        value={nome}
                        onChange={(e) => setDepartamento(e.target.value)} 
                    />

                </div>
                <button className={styles.botaoCadastrar} onClick={cadastrarDepartamento}>
                    Cadastrar
                </button>
          
            </div>

            {showCadastroConcluido && (
                <CadastroConcluido onClose={handleCloseCadastroConcluido} />
            )}

        </div>
    );
}

export default CadastrarDepartamentos;
