import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Etapas from "../models/Etapa";
import Departamentos from "../models/Departamento"; // Importar o model de Departamentos

class EtapaController {

    // Criar uma nova etapa
    async create(req: Request, res: Response): Promise<Response> {
        const { nome, id_departamento } = req.body;
        const etapasRepository = AppDataSource.getRepository(Etapas);
        const departamentosRepository = AppDataSource.getRepository(Departamentos);

        try {
            // Buscar o departamento pelo ID
            const departamento = await departamentosRepository.findOneBy({ id: id_departamento });
            
            // Verificar se o departamento existe
            if (!departamento) {
                return res.status(404).json({ message: "Departamento não encontrado" });
            }

            // Criar nova etapa associada ao departamento
            const etapa = etapasRepository.create({ nome, departamento });
            await etapasRepository.save(etapa);

            return res.status(201).json(etapa);

        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar etapa", error });
        }
    }
}

export default new EtapaController();
