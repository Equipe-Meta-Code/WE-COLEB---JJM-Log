import { useState } from 'react';
import styles from './Cadastros.module.css';
import api from '../../services/api'

function CadastrarDepartamentos() {
    
    const [nome , setDepartamento] = useState(''); 

    async function cadastrarDepartamento() {
        console.log("Cadastrar Pedido");
        console.log(nome);
    
        try {
            const response = await api.post("/departamentos", {
                nome,

            });
            console.log(response)
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
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
        </div>
    );
}

export default CadastrarDepartamentos;
