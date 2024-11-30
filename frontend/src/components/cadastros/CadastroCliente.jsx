import { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from './CadastroCliente.module.css';
import api from '../../services/api';
import CadastroConcluido from './CadastroConcluido';
import ModalFeedback from './ModalFeedback';
import CurrencyInput from 'react-currency-input-field';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { FormLabel } from "react-bootstrap";

function CadastrarCliente() {
    const [formData, setFormData] = useState({
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

    const [emailError, setEmailError] = useState('');
    const [addressData, setAddressData] = useState([{
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        complemento: ''
    }]);
    const [showCadastroConcluido, setShowCadastroConcluido] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModalFeedback, setShowModalFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    function handleInputChange(e) {
        const { name, value } = e.target;
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setEmailError('Por favor, insira um e-mail válido.');
            } else {
                setEmailError('');
            }
        }
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    function handleAddressChange(e, index) {
        const { name, value } = e.target;
        setAddressData(prevState => {
            const updatedAddresses = [...prevState];
            updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
            return updatedAddresses;
        });
    }

    function cleanFormData(data) {
        return {
            ...data,
            cnpj: data.cnpj.replace(/[^0-9]/g, ''),
            telefone: data.telefone.replace(/[^0-9]/g, ''),
            validade_rntrc: data.validade_rntrc,
            valor_fixo: data.valor_fixo.replace(/[^\d,]/g, '').replace(',', '.'),
            valor_adicional: data.valor_adicional.replace(/[^\d,]/g, '').replace(',', '.'),
        };
    }

    async function cadastrarCliente() {
        const isFormComplete =
            Object.values(formData).every((value) => value) &&
            addressData.every((addr) => Object.values(addr).every((value) => value));

        if (!isFormComplete) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            setShowModalFeedback(true);
            return;
        }

        const cleanedClientData = cleanFormData(formData);
        setLoading(true);

        try {
            const clienteResponse = await api.post('/clientes', cleanedClientData);
            const clienteId = clienteResponse.data.id;

            const formattedAddresses = addressData.map((address) => ({
                ...address,
                cliente_id: clienteId,
                cep: address.cep.replace(/[^0-9]/g, ''),
            }));

            for (const address of formattedAddresses) {
                await api.post(`/clientes/${clienteId}/enderecos`, address);
            }

            setShowCadastroConcluido(true);
            resetForm();
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            const errorMessage =
                error.response?.data?.message?.includes('CPF ou CNPJ já em uso')
                    ? 'CNPJ já está em uso.'
                    : 'Houve um erro ao cadastrar o cliente ou os endereços. Tente novamente.';
            setFeedbackMessage(errorMessage);
            setShowModalFeedback(true);
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
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
        setAddressData([{
            cep: '',
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            complemento: ''
        }]);
    }

    function addNewAddress() {
        setAddressData([...addressData, { cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', complemento: '' }]);
    }

    function removeAddress(index) {
        setAddressData(prevState => prevState.filter((_, i) => i !== index));
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

                    <div className={styles.conjuntosCadastros}>
                        <div className={styles.inputsCadastros}>
                            <label>CNPJ:</label>
                            <InputMask
                                className={styles.inputTexto}
                                mask="99.999.999/9999-99"
                                placeholder="CNPJ"
                                value={formData.cnpj}
                                onChange={handleInputChange}
                                name="cnpj"
                            />
                        </div>
                        <div className={styles.inputsCadastros}>
                            <label>Razão Social:</label>
                            <input
                                id={styles.razao}
                                className={styles.inputTexto}
                                type="text"
                                placeholder="Razão Social"
                                value={formData.razao_social}
                                onChange={handleInputChange}
                                name="razao_social"
                            />

                        </div>
                        <div className={styles.inputsCadastros}>
                            <label>Nome Fantasia:</label>
                            <input
                                id={styles.nomeFantasia}
                                className={styles.inputTexto}
                                type="text"
                                placeholder="Nome Fantasia"
                                value={formData.nome_fantasia}
                                onChange={handleInputChange}
                                name="nome_fantasia"
                            />

                        </div>

                        <div className={styles.inputsCadastros}>
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

                        </div>

                        <div className={styles.inputsCadastros}>
                            <label>E-mail:</label>
                            <input
                                id={styles.email}
                                className={styles.inputTexto}
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                name="email"
                            />
                            {emailError && <p style={{ color: 'white' }}>{emailError}</p>}
                        </div>
                    </div>
                    <div className={styles.conjuntosCadastros}>
                        <div className={styles.inputsCadastros}>
                            <label>Inscrição Municipal:</label>
                            <input
                                className={styles.inputTexto}
                                type="text"
                                placeholder="Inscrição Municipal"
                                value={formData.inscricao_municipal}
                                onChange={handleInputChange}
                                name="inscricao_municipal"
                            />

                        </div>

                        <div className={styles.inputsCadastros}>
                            <label>Inscrição Estadual:</label>
                            <input
                                className={styles.inputTexto}
                                type="text"
                                placeholder="Inscrição Estadual"
                                value={formData.inscricao_estadual}
                                onChange={handleInputChange}
                                name="inscricao_estadual"
                            />

                        </div>
                        <div className={styles.inputsCadastros}>
                            <label>Contribuinte:</label>
                            <select
                                className={styles.selectTipoDocumento}
                                value={formData.contribuinte}
                                onChange={handleInputChange}
                                name="contribuinte"
                            >
                                <option value="">Selecione</option>
                                <option value="Sim">SIM</option>
                                <option value="Não">NÃO</option>
                            </select>

                        </div>

                        <div className={styles.inputsCadastros}>
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

                        </div>

                        <div className={styles.inputsCadastros}>

                            <label>Ramo de Atividade:</label>
                            <input
                                className={styles.inputTexto}
                                type="text"
                                placeholder="Ramo de Atividade"
                                value={formData.ramo_atividade}
                                onChange={handleInputChange}
                                name="ramo_atividade"
                            />
                        </div>

                    </div>
                    <div className={styles.conjuntosCadastros}>
                        <div className={styles.inputsCadastros}>
                            <label>RNTRC:</label>
                            <input
                                className={styles.inputTexto}
                                type="text"
                                placeholder="RNTRC"
                                value={formData.rntrc}
                                onChange={handleInputChange}
                                name="rntrc"
                            />


                        </div>
                        <div className={styles.inputsCadastros}>

                            <label>Validade RNTRC:</label>
                            <input
                                className={styles.inputTexto}
                                type="date"
                                placeholder="Validade RNTRC"
                                value={formData.validade_rntrc}
                                onChange={handleInputChange}
                                name="validade_rntrc"
                            />
                        </div>

                        <div className={styles.inputsCadastros}>

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

                        </div>

                        <div className={styles.inputsCadastros}>

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

                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className="titulo-cliente">
                    <h1 className={styles.tituloCard}>Cadastro de Endereço</h1>
                    <button
                        type="button"
                        onClick={addNewAddress}
                        className={styles.botaoAddEndereco}
                    >
                        <AddCircleRoundedIcon style={{ marginRight: '4px' }} />
                        Adicionar Endereço
                    </button>
                </div>
                {addressData.map((address, index) => (
                    <div key={index} className={styles.campos}>
                        <FormLabel htmlFor={`endereco-${index + 1}`}>{`ENDEREÇO ${index + 1}:`}</FormLabel>
                        <div className={styles.conjuntosCadastros}>
                            {/* Card de Endereço */}
                            <div className={styles.inputsCadastros}>
                                <label htmlFor={`cep-${index}`}>CEP:</label>
                                <InputMask
                                    id={`cep-${index}`}
                                    className={styles.inputTexto}
                                    mask="99999-999"
                                    placeholder="CEP"
                                    value={address.cep}
                                    onChange={(e) => handleAddressChange(e, index)}
                                    name="cep"
                                />
                            </div>
                            <div className={styles.inputsCadastros}>
                                <label htmlFor={`rua-${index}`}>Rua:</label>
                                <input
                                    id={`rua-${index}`}
                                    className={styles.inputTexto}
                                    type="text"
                                    placeholder="Rua"
                                    value={address.rua}
                                    onChange={(e) => handleAddressChange(e, index)}
                                    name="rua"
                                />
                            </div>
                            <div className={styles.inputsCadastros}>
                                <label htmlFor={`numero-${index}`}>Número:</label>
                                <input
                                    id={`numero-${index}`}
                                    className={styles.inputTexto}
                                    type="text"
                                    placeholder="Número"
                                    value={address.numero}
                                    onChange={(e) => handleAddressChange(e, index)}
                                    name="numero"
                                />
                            </div>
                        </div>
                        <div className={styles.conjuntosCadastros}>
                            <div className={styles.inputsCadastros}>
                                <label htmlFor={`bairro-${index}`}>Bairro:</label>
                                <input
                                    id={`bairro-${index}`}
                                    className={styles.inputTexto}
                                    type="text"
                                    placeholder="Bairro"
                                    value={address.bairro}
                                    onChange={(e) => handleAddressChange(e, index)}
                                    name="bairro"
                                />
                            </div>
                            <div className={styles.inputsCadastros}>
                                <label htmlFor={`cidade-${index}`}>Cidade:</label>
                                <input
                                    id={`cidade-${index}`}
                                    className={styles.inputTexto}
                                    type="text"
                                    placeholder="Cidade"
                                    value={address.cidade}
                                    onChange={(e) => handleAddressChange(e, index)}
                                    name="cidade"
                                />
                            </div>
                            <div className={styles.inputsCadastros}>
                                <label htmlFor={`estado-${index}`}>Estado:</label>
                                <input
                                    id={`estado-${index}`}
                                    className={styles.inputTexto}
                                    type="text"
                                    placeholder="Estado"
                                    value={address.estado}
                                    onChange={(e) => handleAddressChange(e, index)}
                                    name="estado"
                                />
                            </div>
                            <div className={styles.inputsCadastros}>
                                <label htmlFor={`complemento-${index}`}>Complemento:</label>
                                <input
                                    id={`complemento-${index}`}
                                    className={styles.inputTexto}
                                    type="text"
                                    placeholder="Complemento"
                                    value={address.complemento}
                                    onChange={(e) => handleAddressChange(e, index)}
                                    name="complemento"
                                />
                            </div>
                        </div>

                        {/* Botão de excluir o endereço */}
                        {addressData.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeAddress(index)}
                                className={styles.botaoExcluirEndereco}
                            >
                                Excluir Endereço
                            </button>
                        )}

                        {index < addressData.length - 1 && <hr className={styles.separator} />}
                    </div>
                ))}
            </div>

            <div className={styles.botaoDeCadastrar}>
                <button className={styles.botaoCadastrar} onClick={cadastrarCliente} disabled={loading || emailError}>
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