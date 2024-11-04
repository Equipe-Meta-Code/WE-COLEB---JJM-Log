import { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from './CadastroCliente.module.css';
import api from '../../services/api';
import CadastroConcluido from './CadastroConcluido';
import ModalFeedback from './ModalFeedback';
import CurrencyInput from 'react-currency-input-field';

function CadastrarCliente() {
    const [formData, setFormData] = useState({
        cnpj: '',
        razao_social: '', // Alterado para o nome correto
        nome_fantasia: '',
        inscricao_municipal: '',
        inscricao_estadual: '',
        contribuinte: '',
        telefone: '',
        email: '',
        natureza_operacao: '',
        ramo_atividade: '',
        rntrc: '',
        validade_rntrc: '',
        valor_fixo: '',
        valor_adicional: '',
    });

    const [showCadastroConcluido, setShowCadastroConcluido] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModalFeedback, setShowModalFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    // Função para limpar campos antes de enviar ao backend
    function cleanFormData(data) {
        return {
            ...data,
            cnpj: data.cnpj.replace(/[^0-9]/g, ''), // Remove caracteres não numéricos
            telefone: data.telefone.replace(/[^0-9]/g, ''), // Remove caracteres não numéricos
            validade_rntrc: data.validade_rntrc, // Assumindo que o formato está correto
        };
    }

    async function cadastrarCliente() {
        const isFormComplete = Object.values(formData).every(value => value);
        if (!isFormComplete) {
            setFeedbackMessage("Por favor, preencha todos os campos.");
            setShowModalFeedback(true);
            return;
        }

        const cleanedData = cleanFormData(formData);

        setLoading(true);
        try {
            const response = await api.post("/clientes", cleanedData);
            console.log(response);
            setShowCadastroConcluido(true);
            setFormData({
                cnpj: '',
                razao_social: '',
                nome_fantasia: '',
                inscricao_municipal: '',
                inscricao_estadual: '',
                contribuinte: '',
                telefone: '',
                email: '',
                natureza_operacao: '',
                ramo_atividade: '',
                rntrc: '',
                validade_rntrc: '',
                valor_fixo: '',
                valor_adicional: '',
            });
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            const errorMessage = error.response?.data?.message?.includes("CPF ou CNPJ já em uso")
                ? "CNPJ já está em uso."
                : "Houve um erro ao cadastrar o cliente. Tente novamente.";
            setFeedbackMessage(errorMessage);
            setShowModalFeedback(true);
        } finally {
            setLoading(false);
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
                <h1 className={styles.tituloCard}>Cadastro de Clientes</h1>
                <div className={styles.campos}>
                    <label>CNPJ:</label>
                    <InputMask
                        className={styles.inputTexto}
                        mask="99.999.999/9999-99"
                        placeholder="CNPJ"
                        value={formData.cnpj}
                        onChange={handleInputChange}
                        name="cnpj"
                    />
                    <label>Razão Social:</label>
                    <input
                        className={styles.inputTexto}
                        type="text"
                        placeholder="Razão Social"
                        value={formData.razao_social}
                        onChange={handleInputChange}
                        name="razao_social"
                    />
                    <label>Nome Fantasia:</label>
                    <input
                        className={styles.inputTexto}
                        type="text"
                        placeholder="Nome Fantasia"
                        value={formData.nome_fantasia}
                        onChange={handleInputChange}
                        name="nome_fantasia"
                    />
                    <label>Inscrição Municipal:</label>
                    <input
                        className={styles.inputTexto}
                        type="text"
                        placeholder="Inscrição Municipal"
                        value={formData.inscricao_municipal}
                        onChange={handleInputChange}
                        name="inscricao_municipal"
                    />
                    <label>Inscrição Estadual:</label>
                    <input
                        className={styles.inputTexto}
                        type="text"
                        placeholder="Inscrição Estadual"
                        value={formData.inscricao_estadual}
                        onChange={handleInputChange}
                        name="inscricao_estadual"
                    />
                    <label>Contribuinte:</label>
                    <select
                        className={styles.selectTipoDocumento}
                        value={formData.contribuinte}
                        onChange={handleInputChange}
                        name="contribuinte"
                    >
                        <option value="">Selecione</option>
                        <option value="sim">SIM</option>
                        <option value="nao">NÃO</option>
                    </select>
                    <label>Telefone:</label>
                    <InputMask
                        className={styles.inputTexto}
                        type="text"
                        mask="(99)99999-9999"
                        placeholder="Telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        name="telefone"
                    />
                    <label>E-mail:</label>
                    <input
                        className={styles.inputTexto}
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        name="email"
                    />
                    <label>Natureza da operação:</label>
                    <select
                        className={styles.selectTipoDocumento}
                        value={formData.natureza_operacao}
                        onChange={handleInputChange}
                        name="natureza_operacao"
                    >
                        <option value="">Selecione</option>
                        <option value="Transportadora">Transportadora</option>
                        <option value="Estabelecimento industrial">Estabelecimento industrial</option>
                        <option value="Estabelecimento comercial">Estabelecimento comercial</option>
                        <option value="Serviço de comunicação">Serviço de comunicação</option>
                        <option value="Distribuidora de energia elétrica">Distribuidora de energia elétrica</option>
                        <option value="Produtor rural">Produtor rural</option>
                        <option value="Não contribuinte">Não contribuinte</option>
                    </select>
                    <label>Ramo de Atividade:</label>
                    <input
                        className={styles.inputTexto}
                        type="text"
                        placeholder="Ramo de Atividade"
                        value={formData.ramo_atividade}
                        onChange={handleInputChange}
                        name="ramo_atividade"
                    />
                    <label>RNTRC:</label>
                    <input
                        className={styles.inputTexto}
                        type="text"
                        placeholder="RNTRC"
                        value={formData.rntrc}
                        onChange={handleInputChange}
                        name="rntrc"
                    />
                    <label>Validade RNTRC:</label>
                    <input
                        className={styles.inputTexto}
                        type="date"
                        placeholder="Validade RNTRC"
                        value={formData.validade_rntrc}
                        onChange={handleInputChange}
                        name="validade_rntrc"
                    />
                    <label>Valor fixo:</label>
                    <CurrencyInput
                        id="valor_fixo"
                        name="valor_fixo"
                        className={styles.inputTexto}
                        prefix="R$ "
                        decimalsLimit={2}
                        decimalSeparator=","
                        groupSeparator="."
                        placeholder="0,00"
                        value={formData.valor_fixo}
                        onValueChange={(value, name) => handleInputChange({
                            target: { name, value }
                        })}
                    />
                    <label>Valor adicional:</label>
                    <CurrencyInput
                        id="valor_adicional"
                        name="valor_adicional"
                        className={styles.inputTexto}
                        prefix="R$ "
                        decimalsLimit={2}
                        decimalSeparator=","
                        groupSeparator="."
                        placeholder="0,00"
                        value={formData.valor_adicional}
                        onValueChange={(value, name) => handleInputChange({
                            target: { name, value }
                        })}
                    />
                </div>

                <button className={styles.botaoCadastrar} onClick={cadastrarCliente} disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
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