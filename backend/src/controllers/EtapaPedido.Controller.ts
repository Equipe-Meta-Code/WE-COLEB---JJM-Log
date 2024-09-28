import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import EtapaPedido from "../models/EtapaPedido";
import Etapa from "../models/Etapa";
import Pedido from "../models/Pedido";

class EtapaController {

    // Criar uma nova etapa associada a um pedido
    async create(req: Request, res: Response): Promise<Response> {
        const { estado, etapa_id, pedido_id } = req.body;
        const etapasRepository = AppDataSource.getRepository(EtapaPedido); // Repositório correto para EtapaPedido
        const etapaRepository = AppDataSource.getRepository(Etapa);
        const pedidoRepository = AppDataSource.getRepository(Pedido);

        try {
            // Buscar a etapa e o pedido pelo ID
            const etapa = await etapaRepository.findOneBy({ id: etapa_id });
            const pedido = await pedidoRepository.findOneBy({ id: pedido_id });
            
            // Verificar se o pedido e a etapa existem
            if (!pedido) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            if (!etapa) {
                return res.status(404).json({ message: "Etapa não encontrada" });
            }

            // Criar nova etapa associada ao pedido
            const novaEtapaPedido = etapasRepository.create({ estado, pedido, etapa });
            await etapasRepository.save(novaEtapaPedido);

            return res.status(201).json(novaEtapaPedido);

        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar etapa", error });
        }
    }

    // Listar todas as etapas associadas a pedidos
    async getAll(req: Request, res: Response): Promise<Response> {
        const etapaPedidoRepository = AppDataSource.getRepository(EtapaPedido);

        try {
            const etapasPedidos = await etapaPedidoRepository.find({
                relations: ["pedido", "etapa"], // Ajustar as relações corretas
            });

            return res.status(200).json(etapasPedidos);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar etapas associadas a pedidos", error });
        }
    }

    async getByPedidoId(req: Request, res: Response): Promise<Response> {
        const { pedidoId } = req.params; // Captura o pedidoId da rota
        const etapaPedidoRepository = AppDataSource.getRepository(EtapaPedido);

        try {
            // Buscar as etapas associadas ao pedidoId
            const etapas = await etapaPedidoRepository.find({
                where: { pedido: { id: Number(pedidoId) } }, // Filtra pelo pedidoId
                relations: ["pedido", "etapa", "etapa.departamento"], // Carrega as relações necessárias
            });

            if (!etapas.length) {
                return res.status(404).json({ message: "Nenhuma etapa encontrada para este pedido" });
            }

            return res.status(200).json(etapas);
        } catch (error) {
            console.error("Erro ao buscar etapas por pedidoId:", error);
            return res.status(500).json({ message: "Erro ao buscar etapas", error });
        }
    }

}

export default new EtapaController();
