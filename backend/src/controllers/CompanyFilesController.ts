//Arquivos do mural de avisos no portal de funcionários
import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import CompanyFiles from '../models/CompanyFiles';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import express from 'express';

const app = express();
app.use('/upload/images', express.static(path.join(__dirname, 'src/public/upload/images')));

class CompanyFilesController {
    async create(req: Request, res: Response): Promise<Response> {
        console.log("Chegou no controller");
        console.log("Requisição body:", req.body);
        console.log("Requisição file:", req.file);
    
        const { userId, origem, tipoImg } = req.body;
        const file = req.file;
    
        if (!file) {
            console.error("Nenhuma imagem recebida.");
            return res.status(400).json({ message: "Nenhuma imagem enviada" });
        }
    
        if (!userId || !origem) {
            return res.status(400).json({ message: "userId ou origem não fornecidos" });
        }
    
        const companyFilesRepository = AppDataSource.getRepository(CompanyFiles);
        console.log('Imagem recebida:', file);
        console.log('Informações do usuário:', { userId, origem });
    
        const dataAtual = new Date().toISOString().split('T')[0]; 
    
        try {
            const companyFiles = companyFilesRepository.create({
                nome: file.originalname, 
                rota: file.filename, 
                user_id: parseInt(userId),
                origem: parseInt(origem),
                tipoImg: tipoImg,
                data_criacao: dataAtual,
            });
    
            await companyFilesRepository.save(companyFiles);
            return res.status(201).json(companyFiles);
        } catch (error) {
            console.error("Erro ao salvar no banco de dados:", error);
            return res.status(500).json({ message: "Erro ao salvar no banco de dados", error });
        }
    }
    
    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const companyFilesRepository = AppDataSource.getRepository(CompanyFiles);
            const images = await companyFilesRepository.find({
                where: { tipoImg: "Mural de avisos" },
            });
    
            // Construindo a URL completa
            const imagesWithPath = images.map(img => ({
                ...img,
                url: `${req.protocol}://${req.get('host')}/upload/images/${img.rota}`,
            }));            
    
            return res.status(200).json(imagesWithPath);
        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
            return res.status(500).json({ message: "Erro ao buscar imagens", error });
        }
    }
    
    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const companyFilesRepository = AppDataSource.getRepository(CompanyFiles);

        try {
            // Encontrar o imagem no banco de dados
            const imagem = await companyFilesRepository.findOneBy({ id: parseInt(id) });

            if (!imagem) {
                return res.status(404).json({ message: 'Imagem não encontrada.' });
            }

            const filePath = path.join(__dirname, '..', 'src', 'public', 'upload', 'image', imagem.rota);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Erro ao excluir o imagem no servidor:', err);
                    return res.status(500).json({ message: 'Erro ao excluir o imagem no servidor.' });
                }
                console.log('Imagem excluída do servidor:', filePath);
            });

            await companyFilesRepository.delete(id);
            return res.status(200).json({ message: 'Imagem excluída com sucesso.' });

        } catch (error) {
            console.error('Erro ao excluir o Imagem:', error);
            return res.status(500).json({ message: 'Erro ao excluir o imagem.', error });
        }
    }
    
}
export default new CompanyFilesController();
