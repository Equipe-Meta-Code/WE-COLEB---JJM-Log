import { useState } from "react";
import api from '../../services/api';

function CadastroUsuario(){

    const [novoUsuario, setNovoUsuario] = useState({
        nome: "",
        cpf: "",
        usuario: "",
        senha: "",
    })

    async function cadastrarUsuario() {
        try {
            console.log("Cadastrando",novoUsuario);
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
    
    
    
        return(
            <div>
                <label>Nome:</label>
                <input  value={novoUsuario.nome} onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})} placeholder="Nome"></input>
                <label>CPF:</label>
                <input  value={novoUsuario.cpf} onChange={(e) => setNovoUsuario({...novoUsuario, cpf: e.target.value})} placeholder="CPF"></input>
                <label>Usuário:</label>
                <input  value={novoUsuario.usuario} onChange={(e) => setNovoUsuario({...novoUsuario, usuario: e.target.value})} placeholder="Usuário"></input>
                <label>Senha:</label>
                <input  value={novoUsuario.senha} onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})} placeholder="Senha"></input>
    
                <button onClick={() => cadastrarUsuario}>Teste</button> 
            </div>
    
        )
    }
    
    export default CadastroUsuario;