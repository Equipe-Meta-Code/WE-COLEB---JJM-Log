import { useState } from "react";
import api from '../../services/api';
import './style.css'; 

function CadastroUsuario() {
    const [novoUsuario, setNovoUsuario] = useState({
        nome: "",
        cpf: "",
        usuario: "",
        senha: "",
    });

    async function cadastrarUsuario() {
        try {
            console.log("Cadastrando", novoUsuario);
            const response = await api.post("/users", {
                nome: novoUsuario.nome,
                cpf: novoUsuario.cpf,
                login: novoUsuario.usuario,
                senha: novoUsuario.senha,
            });
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    }

    return (
        <div className="cadastro">
            <h2>Cadastro</h2>
            <div className="label-container">
                <label>Nome:</label>
                <input value={novoUsuario.nome} onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})} placeholder="Nome" />
            </div>
            <div className="label-container">
                <label>CPF:</label>
                <input value={novoUsuario.cpf} onChange={(e) => setNovoUsuario({...novoUsuario, cpf: e.target.value})} placeholder="CPF" />
            </div>
            <div className="label-container">
                <label>Usuário:</label>
                <input value={novoUsuario.usuario} onChange={(e) => setNovoUsuario({...novoUsuario, usuario: e.target.value})} placeholder="Usuário" />
            </div>
            <div className="label-container">
                <label>Senha:</label>
                <input value={novoUsuario.senha} onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})} placeholder="Senha" />
            </div>
            <button onClick={cadastrarUsuario}>Cadastrar</button> 
        </div>
    );
}

export default CadastroUsuario;