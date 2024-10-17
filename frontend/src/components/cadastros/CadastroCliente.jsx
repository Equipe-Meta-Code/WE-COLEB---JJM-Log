import { useState } from 'react';
import InputMask from 'react-input-mask'; // Importando a biblioteca de máscara
import styles from './CadastroCliente.module.css'; // CSS específico para o CadastroCliente
import api from '../../services/api';
import CadastroConcluido from './CadastroConcluido'; // Modal de sucesso reutilizado
import ModalFeedback from './ModalFeedback'; // Importando o ModalFeedback

function CadastrarCliente() {
    const [nome, setNome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState(''); // Adiciona o campo CPF/CNPJ
    const [showCadastroConcluido, setShowCadastroConcluido] = useState(false);
    const [loading, setLoading] = useState(false); // Estado para controle de loading
    const [mask, setMask] = useState("999.999.999-99"); // Inicialmente como CPF
    const [tipoDocumento, setTipoDocumento] = useState("cpf"); // Estado para controlar tipo de documento
    const [showModalFeedback, setShowModalFeedback] = useState(false); // Estado para mostrar o modal de feedback
    const [feedbackMessage, setFeedbackMessage] = useState(''); // Mensagem de feedback

    const handleCpfCnpjChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        setCpfCnpj(value);
    };

    const handleTipoDocumentoChange = (e) => {
        const tipo = e.target.value;
        setTipoDocumento(tipo);
        
        // Ajusta a máscara com base na seleção
        if (tipo === "cpf") {
            setMask("999.999.999-99"); // Máscara CPF
        } else if (tipo === "cnpj") {
            setMask("99.999.999/9999-99"); // Máscara CNPJ
        }
    };

    async function cadastrarCliente() {
        // Validação dos campos
        if (!nome || !cpfCnpj) {
            setFeedbackMessage("Por favor, preencha todos os campos.");
            setShowModalFeedback(true);
            return;
        }

        console.log("Cadastrando Cliente");
        console.log({ nome, cpfCnpj });

        setLoading(true); // Ativa o loading
        try {
            const response = await api.post("/clientes", {
                nome,
                cpf_cnpj: cpfCnpj // Passando o campo cpf_cnpj conforme o módulo do cliente
            });

            console.log(response);
            setShowCadastroConcluido(true);
            setNome('');
            setCpfCnpj(''); // Limpa os campos após cadastro
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            if (error.response && error.response.data) {
                // Se o erro for devido ao CPF/CNPJ já em uso
                if (error.response.data.message.includes("CPF ou CNPJ já em uso")) {
                    setFeedbackMessage("CPF ou CNPJ já está em uso.");
                } else {
                    setFeedbackMessage("Houve um erro ao cadastrar o cliente. Tente novamente."); // Mensagem genérica
                }
            } else {
                setFeedbackMessage("Houve um erro ao cadastrar o cliente. Confira as informações."); // Mensagem genérica
            }
            setShowModalFeedback(true); // Mostra o modal com a mensagem de erro
        } finally {
            setLoading(false); // Desativa o loading
        }
    }

    function handleCloseCadastroConcluido() {
        setShowCadastroConcluido(false);
    }

    function handleCloseModalFeedback() {
        setShowModalFeedback(false);
    }

    return (
        <div className={styles.pagina}>
            <div className={styles.container}>
                <h1 className={styles.tituloCard}>Cadastro de Clientes</h1> {/* Título do Card */}
                <div className={styles.campos}>
                    <label>Nome do Cliente:</label>
                    <input
                        className={styles.inputTexto}
                        type="text"
                        name="nome"
                        placeholder='Nome do Cliente'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} 
                    />

                    <label>Tipo de Documento:</label>
                    <select 
                        className={styles.selectTipoDocumento} 
                        value={tipoDocumento} 
                        onChange={handleTipoDocumentoChange}
                    >
                        <option value="cpf">CPF</option>
                        <option value="cnpj">CNPJ</option>
                    </select>

                    <label>{tipoDocumento === "cpf" ? "CPF:" : "CNPJ:"}</label>
                    <InputMask
                        className={styles.inputTexto}
                        mask={mask} // Usando a máscara dinâmica
                        maskChar=""
                        type="text"
                        name="cpfCnpj"
                        placeholder={tipoDocumento === "cpf" ? 'Digite seu CPF' : 'Digite seu CNPJ'}
                        value={cpfCnpj}
                        onChange={handleCpfCnpjChange} // Usa a nova função
                    />
                </div>
                
                {loading ? (
                    <button className={styles.botaoCadastrar} disabled>
                        Cadastrando...
                    </button>
                ) : (
                    <button className={styles.botaoCadastrar} onClick={cadastrarCliente}>
                        Cadastrar
                    </button>
                )}
            </div>

            {showCadastroConcluido && (
                <CadastroConcluido onClose={handleCloseCadastroConcluido} />
            )}

            {showModalFeedback && (
                <ModalFeedback 
                    message={feedbackMessage} 
                    onClose={handleCloseModalFeedback} 
                />
            )}
        </div>
    );
}

export default CadastrarCliente;
