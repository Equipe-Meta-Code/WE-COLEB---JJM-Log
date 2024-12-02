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
    const [cargoSelecionado, setCargoSelecionado] = useState("");
    const [error, setError] = useState(""); // State for error message
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const navigate = useNavigate(); // Hook para redirecionar após o cadastro
    const [emailError, setEmailError] = useState("");

    // Lista de cargos por nível de acesso
    const cargosPorNivel = {
        "2": [
            "Coordenador administrativo",
            "Gerente de Operações",
            "Gerente Comercial",
            "Diretor Executivo",
        ],
        "1": [
            "Assistente Administrativo",
            "Analista Administrativo",
            "Vendedor",
            "Especialista em Logística",
            "Operador de Logística",
            "Analista de Logística",
            "Motorista",
        ],
        "3": ["Analista de RH"],
    };

    const formatarCPF = (value) => {
        const cpfDigits = value.replace(/\D/g, '');
        let formattedCPF = cpfDigits.slice(0, 11);
        formattedCPF = formattedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        setNovoUsuario({ ...novoUsuario, cpf: formattedCPF });
    };

    const aoApertarEnter = (event) => {
        if (event.key === 'Enter') {
            cadastrarUsuario();
        }
    };

    const cadastrarUsuario = async () => {
        setError(""); // Clear previous error message
        setSuccessMessage(""); // Clear previous success message

        if (novoUsuario.cpf.length !== 14) {
            setError("Por favor, insira um CPF válido com 11 dígitos.");
            return;
        }

        // Validates password: at least 8 characters, including one digit and one special character
        const senhaRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!senhaRegex.test(novoUsuario.senha)) {
            setError("A senha deve ter pelo menos 8 caracteres, incluindo pelo menos um número e um caractere especial.");
            return;
        }

        if (!roles || !cargoSelecionado) {
            setError("Por favor, selecione um nível de acesso e um cargo.");
            return;
        }

        try {
            console.log("Cadastrando", novoUsuario, roles, cargoSelecionado);
            const response = await api.post("/users", {
                nome: novoUsuario.nome,
                cpf: novoUsuario.cpf,
                login: novoUsuario.usuario,
                senha: novoUsuario.senha,
                roles, // Enviar o nível de acesso
                cargo: cargoSelecionado, // Enviar o cargo selecionado
            });

            console.log(response.data);

            setSuccessMessage("Usuário cadastrado com sucesso!");
            setTimeout(() => {
                navigate("/funcionarios");
            }, 2000);
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setError("Erro ao cadastrar usuário. Por favor, tente novamente.");
        }
    };


    const handleEmailChange = (e) => {
        const email = e.target.value;
        setNovoUsuario({ ...novoUsuario, usuario: email });

        // Regex para validar e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Por favor, insira um e-mail válido.');
        } else {
            setEmailError('');
        }
    };

    return (
        <div className="card-container">
            <h2 className="titulo-usuario">Cadastro de Usuário</h2>
            <div className="label-container">
                <label>Nome:</label>
                <input
                    value={novoUsuario.nome}
                    onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                    placeholder="Nome"
                />
            </div>
            <div className="label-container">
                <label>CPF:</label>
                <input
                    value={novoUsuario.cpf}
                    onChange={(event) => formatarCPF(event.target.value)}
                    placeholder="CPF"
                />
            </div>
            <div className="label-container">
                <label>Email:</label>
                <input
                    value={novoUsuario.usuario}
                    onChange={handleEmailChange}
                    placeholder="Usuário"
                />
                {emailError && <p style={{ color: 'white' }}>{emailError}</p>}
            </div>
            <div className="password-container">
                <label>Senha:</label>
                <div className="password-input-container">
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        placeholder="Senha"
                        value={novoUsuario.senha}
                        onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
                        onKeyDown={aoApertarEnter}
                    />
                    <button
                        type="button"
                        className="password-toggle2"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                        {mostrarSenha ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                    </button>
                </div>
            </div>

            {/* Dropdown para escolher o nível de acesso */}
            <div className="label-container">
            <label>Cargo:</label>
            <select
                className="dropdown"
                value={cargoSelecionado}
                onChange={(event) => {
                    const selectedCargo = event.target.value;

                    // Atualiza o cargo e a role correspondente
                    setCargoSelecionado(selectedCargo);
                    if (cargosPorNivel["2"].includes(selectedCargo)) {
                        setRoles("2");
                    } else if (cargosPorNivel["1"].includes(selectedCargo)) {
                        setRoles("1");
                    } else if (cargosPorNivel["3"].includes(selectedCargo)) {
                        setRoles("3");
                    }
                }}
            >
                <option value="">Selecione</option>

                {/* Adiciona as opções de todos os cargos */}
                {Object.keys(cargosPorNivel).map((roleKey) =>
                    cargosPorNivel[roleKey].map((cargo, index) => (
                        <option key={`${roleKey}-${index}`} value={cargo}>
                            {cargo}
                        </option>
                    ))
                )}
            </select>
        </div>


            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button className="botao-cadastro-users" onClick={cadastrarUsuario}>Cadastrar</button>
            <Link to="/login">
                <button className="botao-cadastro-users" id="botaoLogin">Entrar</button>
            </Link>
        </div>
    );
}

export default CadastroUsuario;
