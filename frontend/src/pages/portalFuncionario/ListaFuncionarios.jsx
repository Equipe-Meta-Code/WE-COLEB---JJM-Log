import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api'; // Importe seu arquivo de configuração da API
import './style.css'; 
import { useAuth } from "../../context/AuthContext";

function ListaFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [busca, setBusca] = useState(''); // Estado para a busca
    const [menuAtivo, setMenuAtivo] = useState(null); // Controla qual menu está ativo
    const { userId } = useAuth();
    const origem = userId

    const navigate = useNavigate();

    // Função para buscar os funcionários da API
    async function buscarFuncionarios() {
        try {
            const response = await api.get("/users");
            setFuncionarios(response.data); // Atualiza o estado com os dados da API
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
        }
    }

    useEffect(() => {
        buscarFuncionarios(); // Chama a função quando o componente é montado
    }, []);

    // Função para mapear 'nome_role' para o cargo correspondente
    const getCargo = (roles) => {
        return roles.map((role) => {
            if (role.nome_role === "Admin_Role") return "Gerente";
            if (role.nome_role === "Admin/Vendedor_Role") return "RH";
            if (role.nome_role === "User_Role") return "Funcionário";
            return role.nome_role; // Retorna o nome original caso não haja correspondência
        }).join(', ');
    };

    // Função para filtrar funcionários por nome ou CPF
    const filtrarFuncionarios = () => {
        return funcionarios.filter((funcionario) =>
            funcionario.nome.toLowerCase().includes(busca.toLowerCase()) ||
            funcionario.cpf.toLowerCase().includes(busca.toLowerCase())
        );
    };

    // Função para abrir/fechar o menu de opções
    const clickArquivos = (id) => {
        const userId = id
        
        navigate("/portalFuncionario", { state: { userId, origem } });
    };

    return (
        <div className="lista-funcionarios">

            <h1 className="titulo-funcionarios">Lista de Funcionarios</h1>
            <div className="tabela-de-funcionarios">
                
                {/* Campo de pesquisa */}
                <input 
                    type="text" 
                    className="input-pesquisa" 
                    placeholder="Buscar por nome ou CPF" 
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)} 
                />

                {/* Tabela de funcionários */}
                <table className="tabela-funcionarios">
                    <thead className="cabecalho-tabela">
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>E-Mail</th>
                            <th>Cargo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="corpo-tabela">
                        {filtrarFuncionarios().map((funcionario) => (
                            <tr key={funcionario.id} className="linha-tabela">
                                <td className="coluna-nome">{funcionario.nome}</td>
                                <td className="coluna-cpf">{funcionario.cpf}</td>
                                <td className="coluna-email">{funcionario.login}</td>

                                <td className="coluna-cargo">{getCargo(funcionario.roles)}</td> {/* Mapeia os cargos */}
                                <td className="coluna-acoes">
                                    {/* Botão de menu */}
                                    <div className="menu-container">
                                    <button className="botao-menu" onClick={() => clickArquivos(funcionario.id)}>
                                        Arquivos
                                    </button>



                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListaFuncionarios;
