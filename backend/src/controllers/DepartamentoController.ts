import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Departamentos from "../models/Departamentos";
class DepartamentoController {

    // Criar um novo departamento
    async create(req: Request, res: Response): Promise<Response> {
        const { nome } = req.body;
        const departamentoRepository = getRepository(Departamentos);

        const departamento = departamentoRepository.create({ nome });
        await departamentoRepository.save(departamento);

        return res.status(201).json(departamento);
    }
}

export default new DepartamentoController();
