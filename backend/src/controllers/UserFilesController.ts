import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import UserFiles from '../models/UserFiles';
import 'reflect-metadata';

class UserFilesController {
    async create(req: Request, res: Response): Promise<Response> {
        console.log("Chegou no controller");
        console.log("Requisição body:", req.body);
        console.log("Requisição file:", req.file);
    
        const { userId, origem } = req.body; // Verifica se esses dados estão chegando corretamente
        const file = req.file; // Arquivo enviado via multer
    
        if (!file) {
            console.error("Nenhum arquivo recebido.");
            return res.status(400).json({ message: "Nenhum arquivo enviado" });
        }
    
        if (!userId || !origem) {
            return res.status(400).json({ message: "userId ou origem não fornecidos" });
        }
    
        const userFilesRepository = AppDataSource.getRepository(UserFiles);
        console.log('Arquivo recebido:', file);
        console.log('Informações do usuário:', { userId, origem });
        try {
            const userFiles = userFilesRepository.create({
                rota: file.filename,
                user_id: parseInt(userId), // Se necessário, transforme para número
                origem: parseInt(origem),
            });
    
            await userFilesRepository.save(userFiles);
            return res.status(201).json(userFiles);
        } catch (error) {
            console.error("Erro ao salvar no banco de dados:", error);
            return res.status(500).json({ message: "Erro ao salvar no banco de dados", error });
        }
    }
    
}
export default new UserFilesController();
