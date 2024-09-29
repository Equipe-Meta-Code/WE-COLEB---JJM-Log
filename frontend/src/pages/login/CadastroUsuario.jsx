import React, { useState } from "react";
import api from '../../services/api';
import './style.css'; 
import { Link } from 'react-router-dom';

function CadastroUsuario() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [novoUsuario, setNovoUsuario] = useState({
        nome: "",
        cpf: "",
        usuario: "",
        senha: "",
    });
    const [error, setError] = useState(""); // State for error message
    const [successMessage, setSuccessMessage] = useState(""); // State for success message

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
            console.log("Cadastrando", novoUsuario);
            const response = await api.post("/users", {
                nome: novoUsuario.nome,
                cpf: novoUsuario.cpf,
                login: novoUsuario.usuario,
                senha: novoUsuario.senha,
                roles: '2'
            });

            console.log(response.data);

            setSuccessMessage("Usuário cadastrado com sucesso!");
            setTimeout(() => {
                // Assuming navigate is imported from somewhere else in your code
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setError("Erro ao cadastrar usuário. Por favor, tente novamente.");
        }
    };

    return (
        <div className="cadastro">
            <h2>Cadastro</h2>
            <div className="label-container">
                <label>Nome:</label>
                <input value={novoUsuario.nome} onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})} placeholder="Nome" />
            </div>
            <div className="label-container">
                <label>CPF:</label>
                <input value={novoUsuario.cpf} onChange={(event) => formatarCPF(event.target.value)} placeholder="CPF" />
            </div>
            <div className="label-container">
                <label>Usuário:</label>
                <input value={novoUsuario.usuario} onChange={(e) => setNovoUsuario({...novoUsuario, usuario: e.target.value})} placeholder="Usuário" />
            </div>
            <div className="label-container">
                <label>Senha:</label>
                <input 
                    type={mostrarSenha ? "text" : "password"} 
                    placeholder="Senha" 
                    value={novoUsuario.senha} 
                    onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})} 
                    onKeyDown={aoApertarEnter}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button onClick={cadastrarUsuario}>Cadastrar</button> 
            <Link to="/login">
                <button className="botaoLogin">Entrar</button>
            </Link>
        </div>
    );
}

export default CadastroUsuario;
