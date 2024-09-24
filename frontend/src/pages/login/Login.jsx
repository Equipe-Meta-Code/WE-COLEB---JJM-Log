import { useState } from "react";
import api from '../../services/api';

function Login(){

    const [novoUsuario, setNovoUsuario] = useState({
        usuario: "",
        senha: "",
    })

    async function LoginUsuario() {
        try {
            console.log("Cadastrando",novoUsuario);
            const response = await api.post("/users", {
                login: novoUsuario.usuario,
                senha: novoUsuario.senha,
            });
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    }
    
    
    
        return(
            <div>
                <label>Usuário:</label>
                <input  value={novoUsuario.usuario} onChange={(e) => setNovoUsuario({...novoUsuario, usuario: e.target.value})} placeholder="Usuário"></input>
                <label>Senha:</label>
                <input  value={novoUsuario.senha} onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})} placeholder="Senha"></input>
    
                <button onClick={() => LoginUsuario}>Teste</button> 
            </div>
    
        )
    }
    
    export default Login;