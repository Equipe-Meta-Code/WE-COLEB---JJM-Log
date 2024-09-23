import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import Departamentos from "../models/Departamentos";

class DepartamentoController {

    // Criar um novo departamento
    async create(req: Request, res: Response): Promise<Response> {
        const { nome } = req.body;
        const departamentoRepository = AppDataSource.getRepository(Departamentos);

        const departamento = departamentoRepository.create({ nome });
        await departamentoRepository.save(departamento);

        return res.status(201).json(departamento);
    }
}

export default new DepartamentoController();
