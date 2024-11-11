import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import User from "../models/User";

class SessionController {

    async create(request: Request, response: Response) {

        const { login , senha } = request.body;

        const userRepository = AppDataSource.getRepository(User); 

        // Verifica se o usuário existe pelo login
        const user = await userRepository.findOneBy({login});

        if(!user) {
            return response.status(400).json({error: "User not found!"});
        }

        // Compara a senha
        const matchSenha = await compare(senha, user.senha);

        if(!matchSenha) {
            return response.status(400).json({error: "Incorrect login or password!"});
        }

        // Cria o token com o ID do usuário
        const token = sign({}, "7243660f79803bd3ff08830304134d4f", {
            subject: user.id.toString(), // Use o ID do usuário como "subject"
            expiresIn: "1d",
        });

        // Retorna o token e o id do usuário explicitamente
        return response.json({
            token, 
            userId: user.id, // Agora retornamos o `userId` explicitamente
        });
    }
}

export default new SessionController();
