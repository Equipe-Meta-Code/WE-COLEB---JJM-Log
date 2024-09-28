import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import Departamentos from "../models/Departamento";

class DepartamentoController {


    async create(req: Request, res: Response): Promise<Response> {
        const { nome } = req.body;
        const departamentoRepository = AppDataSource.getRepository(Departamentos);

        const departamento = departamentoRepository.create({ nome });
        await departamentoRepository.save(departamento);

        return res.status(201).json(departamento);
    }
    
    async getAll(req: Request, res: Response): Promise<Response> {
        const departamentoRepository = AppDataSource.getRepository(Departamentos);

        const departamentos = await departamentoRepository.find();

        return res.status(200).json(departamentos);
    }
}

export default new DepartamentoController();
