import { useState } from 'react';
import styles from './Cadastros.module.css';

function CadastrarDepartamentos() {
    const [departamento, setDepartamento] = useState(''); 

    async function cadastrarDepartanento() {
        console.log("Cadastrar Pedido");
        console.log(departamento);
    };

    return (
        <div className={styles.pagina}>
            <div className={styles.container}>
                <h1 className={styles.titulo}>Cadastro de Departamentos</h1>
                <div className={styles.campos}>

                    <label>Nome do Departamento:</label>
                    <input
                        className={styles.inputDepartamento} 
                        type="text"
                        name="titulo"
                        placeholder='Nome do Departamento'
                        value={departamento}
                        onChange={(e) => setDepartamento(e.target.value)} 
                    />

                </div>
                <button className={styles.botaoCadastrar} onClick={cadastrarDepartanento}>Enviar</button>
            </div>
        </div>
    );
}

export default CadastrarDepartamentos;
