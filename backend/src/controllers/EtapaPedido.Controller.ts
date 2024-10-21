import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import EtapaPedido from "../models/EtapaPedido";
import Pedido from "../models/Pedido";

class EtapaController {

    // Criar uma nova etapa associada a um pedido
    async create(req: Request, res: Response): Promise<Response> {
        const { estado, nome, departamento, data_conclusao, pedido_id } = req.body;
        const etapasRepository = AppDataSource.getRepository(EtapaPedido);
        const pedidoRepository = AppDataSource.getRepository(Pedido);

        try {
            // Buscar o pedido pelo ID
            const pedido = await pedidoRepository.findOneBy({ id: pedido_id });
            
            // Verificar se o pedido existe
            if (!pedido) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            const novaEtapaPedido = etapasRepository.create({
                estado,
                nome,
                departamento,
                data_conclusao,
                pedido
            });

            await etapasRepository.save(novaEtapaPedido);

            return res.status(201).json(novaEtapaPedido);

        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar etapa", error });
        }
    }


    async getAll(req: Request, res: Response): Promise<Response> {
        const etapaPedidoRepository = AppDataSource.getRepository(EtapaPedido);

        try {
            const etapasPedidos = await etapaPedidoRepository.find({
                relations: ["pedido", "departamento"], // Ajustar as relações corretas (não mais precisa da relação 'etapa')
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

            const etapas = await etapaPedidoRepository.find({
                where: { pedido: { id: Number(pedidoId) } },
                relations: ["pedido", "departamento"],
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

    
    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { estado, nome, departamento_id, data_conclusao, etapa_desfeita } = req.body;
        const etapasRepository = AppDataSource.getRepository(EtapaPedido);

        try {

            const etapaPedido = await etapasRepository.findOneBy({ id: Number(id) });

            
            if (!etapaPedido) {
                return res.status(404).json({ message: "Etapa associada ao pedido não encontrada" });
            }

            
            etapaPedido.estado = estado;
            etapaPedido.nome = nome;
            etapaPedido.departamento = departamento_id;
            etapaPedido.data_conclusao = data_conclusao;
            etapaPedido.etapa_desfeita = etapa_desfeita;

            
            await etapasRepository.save(etapaPedido);

            return res.status(200).json(etapaPedido);

        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar a etapa associada ao pedido", error });
        }
    }

}

export default new EtapaController();
