import React, { useState } from "react";
import api from '../../services/api';
import './cadastro.css'; 
import { Link, useNavigate } from 'react-router-dom';

function CadastroUsuario() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [novoUsuario, setNovoUsuario] = useState({
        nome: "",
        cpf: "",
        usuario: "",
        senha: "",
    });
    const [roles, setRoles] = useState(""); 
    const [error, setError] = useState(""); // State for error message
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const navigate = useNavigate(); // Hook para redirecionar após o cadastro

    const formatarCPF = (value) => {
        const cpfDigits = value.replace(/\D/g, ''); // Remove all non-numeric characters
        let formattedCPF = cpfDigits.slice(0, 11); // Ensures CPF has at most 11 digits
    
        // Apply CPF formatting mask
        formattedCPF = formattedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        setNovoUsuario({...novoUsuario, cpf: formattedCPF})
    };

    const aoApertarEnter = (event) => {
        if (event.key === 'Enter') {
            cadastrarUsuario();
        }
    };

    const cadastrarUsuario = async () => {
        setError(""); // Clear previous error message
        setSuccessMessage(""); // Clear previous success message

        if (novoUsuario.cpf.length !== 14) { // Checks if CPF has 14 characters, including dots and dash
            setError("Por favor, insira um CPF válido com 11 dígitos.");
            return;
        }

        // Validates password: at least 8 characters, including one digit and one special character
        const senhaRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!senhaRegex.test(novoUsuario.senha)) {
            setError("A senha deve ter pelo menos 8 caracteres, incluindo pelo menos um número e um caractere especial.");
            return;
        }

        try {
            console.log("Cadastrando", novoUsuario, roles);
            const response = await api.post("/users", {
                nome: novoUsuario.nome,
                cpf: novoUsuario.cpf,
                login: novoUsuario.usuario,
                senha: novoUsuario.senha,
                roles: roles // Enviar o nível de acesso selecionado
            });

            console.log(response.data);

            setSuccessMessage("Usuário cadastrado com sucesso!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setError("Erro ao cadastrar usuário. Por favor, tente novamente.");
        }
    };

    return (
        <div className="card-container">
            <h2>Cadastro de Usuário</h2>
            <div className="label-container">
                <label>Nome:</label>
                <input value={novoUsuario.nome} onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})} placeholder="Nome" />
            </div>
            <div className="label-container">
                <label>CPF:</label>
                <input value={novoUsuario.cpf} onChange={(event) => formatarCPF(event.target.value)} placeholder="CPF" />
            </div>
            <div className="label-container">
                <label>Email:</label>
                <input value={novoUsuario.usuario} onChange={(e) => setNovoUsuario({...novoUsuario, usuario: e.target.value})} placeholder="Usuário" />
            </div>
            <div className="password-container">
                <label>Senha:</label>
                <div className="password-input-container">
                    <input 
                        type={mostrarSenha ? "text" : "password"} 
                        placeholder="Senha" 
                        value={novoUsuario.senha} 
                        onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})} 
                        onKeyDown={aoApertarEnter}
                    />
                    <button 
                        type="button" 
                        className="password-toggle" 
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                        {mostrarSenha ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                    </button>
                </div>
            </div>

            {/* Dropdown para escolher o nível de acesso */}
            <div className="label-container">
                <label>Nível de Acesso:</label>
                <select
                    className="dropdown" // Adicionando a classe para aplicar o estilo
                    value={roles}
                    onChange={(event) => setRoles(event.target.value)}
                >
                     <option value={""}>Selecione</option>
                    <option value={"1"}>Usuário Comum</option>
                    <option value={"2"}>Administrador</option>
                    <option value={"3"}>Recursos Humanos</option>
                </select>
            </div>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button className="botao-cadastro-users"onClick={cadastrarUsuario}>Cadastrar</button> 
            <Link to="/login">
                <button className="botao-cadastro-users" id="botaoLogin">Entrar</button>
            </Link>
        </div>
    );
}

export default CadastroUsuario;
