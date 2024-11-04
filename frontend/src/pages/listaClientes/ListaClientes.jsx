import React, { useEffect, useState } from "react";
import api from '../../services/api';
import Modal from './modal'; // Certifique-se de que o caminho esteja correto
import './style.css';
import { useNavigate } from 'react-router-dom';

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const [busca, setBusca] = useState(''); // Estado para a busca
    const [openModal, setOpenModal] = useState(false); // Estado para o modal
    const [clienteSelecionado, setClienteSelecionado] = useState(null); // Estado para o cliente selecionado

    // Função para buscar os clientes da API
    async function buscarClientes() {
        try {
            const response = await api.get("/clientes");
            setClientes(response.data); // Atualiza o estado com os dados da API
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    }

    // Função para deletar um cliente da API
    async function deletarClientes(id) {
        try {
            await api.delete(`/clientes/${id}`); // Deleta o cliente específico
            // Atualiza a lista de clientes removendo o deletado
            setClientes(clientes.filter(cliente => cliente.id !== id));
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
        }
    }

    // Função para editar um cliente da API
    async function editarClientes(cliente) {
        try {
            const response = await api.put(`/clientes/${cliente.id}`, cliente); // Atualiza o cliente específico
            // Atualiza a lista de clientes com os dados retornados
            setClientes(clientes.map(c => (c.id === cliente.id ? response.data : c)));
        } catch (error) {
            console.error("Erro ao editar cliente:", error);
        }
    }

    // Função para abrir o modal de edição
    const handleEditClick = (cliente) => {
        setClienteSelecionado(cliente); // Define o cliente selecionado
        setOpenModal(true); // Abre o modal
    };

    useEffect(() => {
        buscarClientes(); // Chama a função quando o componente é montado
    }, []);

    // Função para filtrar clientes por nome ou CPF ou CNPJ
    const filtrarClientes = () => {
        return clientes.filter((cliente) =>
            cliente.razao_social.toLowerCase().includes(busca.toLowerCase()) ||
            cliente.cnpj.toLowerCase().includes(busca.toLowerCase()) ||
            cliente.nome_fantasia.toLowerCase().includes(busca.toLowerCase())
        );
    };

    // Função para formatar  CNPJ
    const formatarCNPJ = (value) => {
        const cnpjDigits = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (cnpjDigits.length === 14) {
            // Formatação de CNPJ: 00.000.000/0000-00
            return cnpjDigits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        }
        return value; // Retorna o valor sem formatação caso não seja CPF ou CNPJ válido
    };

    const navigate = useNavigate();

    const handleMoreInfo = (id) => {
        navigate(`/clientes/${id}`);
    };

    function formatTelefone(telefone) {
        return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    };

    return (
        <div className="lista-clientes">
            <h1 className="titulo-clientes">Lista de Clientes</h1>
            <div className="tabela-de-clientes">

                {/* Campo de pesquisa */}
                <input
                    type="text"
                    className="input-pesquisa"
                    placeholder="Buscar por nome ou CPF/CNPJ"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />

                {/* Tabela de clientes */}
                <table className="tabela-clientes">
                    <thead className="cabecalho-tabela">
                        <tr>
                            <th>CPF/CNPJ</th>
                            <th>Razão Social</th>
                            <th>Nome Fantasia</th>
                            <th>Mais Informações</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="corpo-tabela">
                        {filtrarClientes().map((cliente) => (
                            <tr key={cliente.id} className="linha-tabela">
                                <td className="coluna-razao_social">{cliente.razao_social}</td>
                                <td className="coluna-nome_fantasia">{cliente.nome_fantasia}</td>
                                <td className="coluna-cnpj">{formatarCNPJ(cliente.cnpj)}</td>
                                <td>
                                    <div className="menu-container">
                                        <button className="botao-menu-clientes" onClick={() => handleMoreInfo(cliente.id)}>
                                            <PersonRoundedIcon style={{ marginRight: '4px' }} />
                                        </button>
                                    </div>
                                </td>

                                <td className="coluna-acoes-clientes">
                                    <div className="menu-container">
                                        <button className="botao-menu-clientes" onClick={() => deletarClientes(cliente.id)}>
                                            <DeleteOutlineRoundedIcon style={{ marginRight: '4px' }} />
                                        </button>
                                    </div>
                                    <div className="menu-container">
                                        <button className='botao-menu-clientes' onClick={() => handleEditClick(cliente)}>
                                            <DriveFileRenameOutlineRoundedIcon style={{ marginRight: '4px' }} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para editar cliente */}
            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(false)}>
                <div className="container-modal">
                    <div className="title-modal">Editar Cliente</div>
                    <div className="content-modal">
                        {clienteSelecionado && (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                editarClientes(clienteSelecionado); // Chama a função para editar o cliente
                                setOpenModal(false); // Fecha o modal
                            }}>
                                <label className="label-cliente">CNPJ</label>
                                <input
                                    type="text"
                                    maxLength={14}
                                    value={formatarCNPJ(clienteSelecionado.cnpj)}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, cnpj: e.target.value })}
                                />
                                <label className="label-cliente">Razão Social</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.razao_social}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, razao_social: e.target.value })}
                                />
                                <label className="label-cliente">Nome Fantasia</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.nome_fantasia}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, nome_fantasia: e.target.value })}
                                />
                                <label className="label-cliente">Inscrição Municipal</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.inscricao_municipal}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, inscricao_municipal: e.target.value })}
                                />
                                <label className="label-cliente">Inscrição Estadual</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.inscricao_estadual}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, inscricao_estadual: e.target.value })}
                                />
                                <label className="label-cliente">Contribuinte</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.contribuinte}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, contribuinte: e.target.value })}
                                />
                                <label className="label-cliente">Telefone</label>
                                <input
                                    type="text"
                                    value={formatTelefone(clienteSelecionado.telefone)}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, telefone: e.target.value })}
                                />
                                <label className="label-cliente">Email</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.email}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, email: e.target.value })}
                                />
                                <label className="label-cliente">Natureza da Operacao</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.natureza_operacao}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, natureza_operacao: e.target.value })}
                                />
                                <label className="label-cliente">Ramo de atividade</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.ramo_atividade}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, ramo_atividade: e.target.value })}
                                />
                                <label className="label-cliente">RNTRC</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.rntrc}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, rntrc: e.target.value })}
                                />
                                <label className="label-cliente">Validade RNTRC</label>
                                <input
                                    type="date"
                                    value={clienteSelecionado.validade_rntrc}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, validade_rntrc: e.target.value })}
                                />

                                <label className="label-cliente">Valor fixo</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.valor_fixo}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, valor_fixo: e.target.value })}
                                />
                                <label className="label-cliente">Valor adicional</label>
                                <input
                                    type="text"
                                    value={clienteSelecionado.valor_adicional}
                                    onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, valor_adicional: e.target.value })}
                                />

                                <button type="submit">
                                    Salvar
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ListaClientes;