import { useState, useCallback } from "react";
import api from '../../services/api';
import './style.css'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [novoUsuario, setNovoUsuario] = useState({
        usuario: "",
        senha: "",
    });

    const [error, setError] = useState(''); // Adicionado o estado para armazenar o erro
    const navigate = useNavigate();

    async function LoginUsuario() {
        try {
            console.log("Logando", novoUsuario);
            const response = await api.post("/sessions", {
                login: novoUsuario.usuario,
                senha: novoUsuario.senha,
            });            
        } catch (error) {
            console.error("Erro ao logar:", error);
        }
    }

    const { signIn } = useAuth();

    const handleSubmit = useCallback(async(event) => {
        event.preventDefault();
        const { usuario: login, senha } = novoUsuario;
        if (!login || !senha) {
            setError("Por favor, preencha todos os campos."); // Chama setError se houver campos vazios
            return;
        }
        try {
            await signIn({ login, senha });
            navigate('/portalFuncionario');
        } catch (error) {
            setError("Credenciais inválidas. Por favor, verifique seu login e senha."); // Define a mensagem de erro em caso de falha no login
        }
    }, [novoUsuario, signIn, navigate]);

    const handleLoginChange = (event) => {
        const value = event.target.value;
        if (value.length === 11) {
            const formattedCPF = formatCPF(value);
            setNovoUsuario({...novoUsuario, usuario: formattedCPF})
        } else {
            setNovoUsuario({...novoUsuario, usuario: value})
        }
    };

    const handleSenhaChange = (event) => {
        const value = event.target.value;
        setNovoUsuario({...novoUsuario, senha: value});
    };

    const formatCPF = (input) => {
        const cleaned = input.replace(/[^\d]/g, '');
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
        if (match) {
            return [match[1], match[2], match[3], match[4]].filter(Boolean).join('.').replace(/\.$/, '').replace(/\.(?=\d{1,2}$)/, '-');
        }
        return input;
    };

    return (
        <div className="login">
            <h2>Login para portal de funcionários</h2>
            <form onSubmit={handleSubmit}>
                <div className="label-container">
                    <label>Usuário:</label>
                    <input 
                        value={novoUsuario.usuario} 
                        onChange={handleLoginChange} 
                        placeholder="Usuário" 
                    />
                </div>
                <div className="label-container">
                    <label>Senha:</label>
                    <input 
                        type="password"
                        value={novoUsuario.senha} 
                        onChange={handleSenhaChange} 
                        placeholder="Senha" 
                    />
                </div>
                {error && <p className="error-message">{error}</p>} {/* Exibir a mensagem de erro */}
                <button type="submit" className="botaoLogin">Login</button>
            </form>
            <Link to="/cadastro">
                <button className="botaoLogin">Cadastre-se</button>
            </Link>
        </div>
    );
}

export default Login;
