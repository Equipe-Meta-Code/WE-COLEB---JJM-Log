import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Etapas from "../models/Etapa";
import Departamentos from "../models/Departamento";

class EtapaController {


    async create(req: Request, res: Response): Promise<Response> {
        const { nome, id_departamento } = req.body;
        const etapasRepository = AppDataSource.getRepository(Etapas);
        const departamentosRepository = AppDataSource.getRepository(Departamentos);

        try {

            const departamento = await departamentosRepository.findOneBy({ id: id_departamento });
            

            if (!departamento) {
                return res.status(404).json({ message: "Departamento não encontrado" });
            }


            const etapa = etapasRepository.create({ nome, departamento });
            await etapasRepository.save(etapa);

            return res.status(201).json(etapa);

        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar etapa", error });
        }
    }


    async getAll(req: Request, res: Response): Promise<Response> {
        const etapaRepository = AppDataSource.getRepository(Etapas);

        try {

            const etapas = await etapaRepository.find({
                relations: ["departamento"],
            });

            return res.status(200).json(etapas);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar etapas", error });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { nome, fixo, id_departamento } = req.body;
        const etapasRepository = AppDataSource.getRepository(Etapas);
        const departamentosRepository = AppDataSource.getRepository(Departamentos);

        try {

            const etapa = await etapasRepository.findOneBy({ id: Number(id) });
            if (!etapa) {
                return res.status(404).json({ message: "Etapa não encontrada" });
            }

            if (id_departamento) {
                const departamento = await departamentosRepository.findOneBy({ id: id_departamento });
                if (!departamento) {
                    return res.status(404).json({ message: "Departamento não encontrado" });
                }
                etapa.departamento = departamento;
            }

            if (nome) etapa.nome = nome;
            if (fixo) etapa.fixo = fixo;

            await etapasRepository.save(etapa);

            return res.status(200).json(etapa);

        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar etapa", error });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const etapasRepository = AppDataSource.getRepository(Etapas);

        try {
            
            const etapa = await etapasRepository.findOneBy({ id: Number(id) });
            if (!etapa) {
                return res.status(404).json({ message: "Etapa não encontrada" });
            }

            await etapasRepository.remove(etapa);

            return res.status(200).json({ message: "Etapa deletada com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar etapa", error });
        }
    }
}

export default new EtapaController();
