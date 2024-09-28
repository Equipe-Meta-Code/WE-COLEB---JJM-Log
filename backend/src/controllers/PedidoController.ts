import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Pedido from "../models/Pedido";
/* import Users from "../models/Users"; 
import Clientes from "../models/Clientes";  */

class PedidoController {
    // Criar um novo pedido
    async create(req: Request, res: Response): Promise<Response> {
        const {
            nome,
            descricao,
            data_criacao,
            data_entrega,
            categoria,
            tipo,
            peso,
            quantidade,
            volume,
            distancia,
        } = req.body;

        const pedidoRepository = AppDataSource.getRepository(Pedido);

        try {

            // Criar um novo pedido com os IDs de usuário e cliente
            const pedido = pedidoRepository.create({
                nome,
                descricao,
                data_criacao,
                data_entrega,
                categoria,
                tipo,
                peso,
                quantidade,
                volume,
                distancia,
            });

            // Salvar o pedido no banco de dados
            await pedidoRepository.save(pedido);

            return res.status(201).json(pedido);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar pedido", error });
        }
    }

    // Buscar todos os pedidos
    async getAll(req: Request, res: Response): Promise<Response> {
        const pedidoRepository = AppDataSource.getRepository(Pedido);

        const pedidos = await pedidoRepository.find();

        return res.status(200).json(pedidos);
    }
}

export default new PedidoController();
