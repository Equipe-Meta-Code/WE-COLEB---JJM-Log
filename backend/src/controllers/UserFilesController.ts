import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import UserFiles from '../models/UserFiles';
import 'reflect-metadata';

class UserFilesController {
    async create(req: Request, res: Response): Promise<Response> {
        console.log("Chegou no controller");
        console.log("Requisição body:", req.body);
        console.log("Requisição file:", req.file);
    
        const { userId, origem, tipo } = req.body;
        const file = req.file;
    
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
    
        // Gerar a data atual no formato YYYY-MM-DD
        const dataAtual = new Date().toISOString().split('T')[0]; // Gera a data no formato YYYY-MM-DD
    
        try {
            const userFiles = userFilesRepository.create({
                nome: file.originalname, // Nome do arquivo
                rota: file.filename, // filename gerado pelo multer
                user_id: parseInt(userId),
                origem: parseInt(origem),
                tipo: tipo,
                data_criacao: dataAtual, // Adicionando a data no formato correto
            });
    
            await userFilesRepository.save(userFiles);
            return res.status(201).json(userFiles);
        } catch (error) {
            console.error("Erro ao salvar no banco de dados:", error);
            return res.status(500).json({ message: "Erro ao salvar no banco de dados", error });
        }
    }
    
    
    

    async getAll(req: Request, res: Response): Promise<Response> {
        const UserFilesRepository = AppDataSource.getRepository(UserFiles);

        const userFiles = await UserFilesRepository.find();

        return res.status(200).json(userFiles);
    }
    
}
export default new UserFilesController();
