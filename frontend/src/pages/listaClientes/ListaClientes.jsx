import React, { useEffect, useState } from "react";
import api from '../../services/api'; 
import Modal from './modal'; // Certifique-se de que o caminho esteja correto
import './style.css'; 

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
            cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
            cliente.cpf_cnpj.toLowerCase().includes(busca.toLowerCase()) 
        );
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
                            <th>Nome</th>
                            <th>CPF/CNPJ</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="corpo-tabela">
                        {filtrarClientes().map((cliente) => (
                            <tr key={cliente.id} className="linha-tabela">
                                <td className="coluna-nome">{cliente.nome}</td>
                                <td className="coluna-cpf">{cliente.cpf_cnpj}</td>
                                
                                <td className="coluna-acoes">
                                    {/* Botão para deletar o cliente */}
                                    <div className="menu-container">
                                        <button className="botao-menu" onClick={() => deletarClientes(cliente.id)}>
                                            deletar
                                        </button>
                                    </div>
                                    <div className="menu-container">
                                        <button className='botao-menu' onClick={() => handleEditClick(cliente)}>
                                            editar
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
                                <label>Nome</label>
                                <input 
                                    type="text" 
                                    value={clienteSelecionado.nome} 
                                    onChange={(e) => setClienteSelecionado({...clienteSelecionado, nome: e.target.value})} 
                                />
                                
                                <label>CPF/CNPJ</label>
                                <input 
                                    type="text" 
                                    value={clienteSelecionado.cpf_cnpj} 
                                    onChange={(e) => setClienteSelecionado({...clienteSelecionado, cpf_cnpj: e.target.value})} 
                                />

                                {/* Adicione outros campos conforme necessário */}
                                
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