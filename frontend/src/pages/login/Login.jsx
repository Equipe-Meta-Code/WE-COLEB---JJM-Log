import { useState } from "react";
import api from '../../services/api';
import './style.css'; 

function Login() {
    const [novoUsuario, setNovoUsuario] = useState({
        usuario: "",
        senha: "",
    });

    async function LoginUsuario() {
        try {
            console.log("Logando", novoUsuario);
            const response = await api.post("/users/login", {
                login: novoUsuario.usuario,
                senha: novoUsuario.senha,
            });
        } catch (error) {
            console.error("Erro ao logar:", error);
        }
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <div className="label-container">
                <label>Usuário:</label>
                <input value={novoUsuario.usuario} onChange={(e) => setNovoUsuario({...novoUsuario, usuario: e.target.value})} placeholder="Usuário" />
            </div>
            <div className="label-container">
                <label>Senha:</label>
                <input value={novoUsuario.senha} onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})} placeholder="Senha" />
            </div>
            <button onClick={LoginUsuario}>Login</button> 
        </div>
    );
}

export default Login;