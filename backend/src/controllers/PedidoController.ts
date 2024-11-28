import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Pedido from "../models/Pedido";
import User from "../models/User";
import Cliente from "../models/Cliente";
import { format } from "date-fns";


class PedidoController {
    // Criar um novo pedido
    async create(req: Request, res: Response): Promise<Response> {
        const {
            user_id,
            cliente_id,
            nome,
            descricao,
            data_criacao,
            data_entrega,
            estado,
            categoria,
            tipo,
            peso,
            quantidade,
            volume,
            distancia,
            total,
            lucro,
        } = req.body;

        const pedidoRepository = AppDataSource.getRepository(Pedido);
        const userRepository = AppDataSource.getRepository(User);
        const clienteRepository = AppDataSource.getRepository(Cliente);

        try {
            const user = await userRepository.findOneBy({ id: user_id });
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            const cliente = await clienteRepository.findOneBy({ id: cliente_id });
            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }

            const pedido = pedidoRepository.create({
                user,
                cliente,
                nome,
                descricao,
                data_criacao,
                data_entrega,
                estado,
                categoria,
                tipo,
                peso,
                quantidade,
                volume,
                distancia,
                total,
                lucro,
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
        
        // Busca todos os pedidos
        const pedidos = await pedidoRepository.find();

        // Formata a data de criação de cada pedido
        const pedidosFormatados = pedidos.map(pedido => ({
            ...pedido,
            data_criacao: format(new Date(pedido.data_criacao), 'dd/MM/yyyy'), // Formata a data como 'dd/MM/yyyy'
            data_entrega: format(new Date(pedido.data_entrega), 'dd/MM/yyyy'), // Se precisar formatar a data de entrega também
        }));

        // Retorna os pedidos com a data formatada
        return res.status(200).json(pedidosFormatados);
    }

    // Buscar um pedido por ID
    async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const pedidoRepository = AppDataSource.getRepository(Pedido);

        try {
            // Busca o pedido junto com as relações (user e cliente)
            const pedido = await pedidoRepository.findOne({
                where: { id: Number(id) },
                relations: ["user", "cliente"], // Incluindo as relações que você precisa
            });

            if (!pedido) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            return res.status(200).json(pedido);
        } catch (error) {
            console.error("Erro ao buscar o pedido por ID:", error);
            return res.status(500).json({ message: "Erro ao buscar pedido", error });
        }
    }

    async getTurnoverByClient(req: Request, res: Response): Promise<Response> {
        const pedidoRepository = AppDataSource.getRepository(Pedido);

        try {
            // Busca todos os pedidos agrupados por cliente
            const pedidosPorCliente = await pedidoRepository
                .createQueryBuilder("pedido")
                .select("pedido.cliente_id", "clienteId")
                .addSelect("COUNT(pedido.id)", "totalPedidos")
                .groupBy("pedido.cliente_id")
                .getRawMany();

            // Calcula o turnover para cada cliente (simulado entre 5% e 15%)
            const turnoverData = pedidosPorCliente.map((pedido) => ({
                clienteId: pedido.clienteId,
                totalPedidos: parseInt(pedido.totalPedidos, 10),
                turnover: Math.min(15, Math.max(5, Math.round(Math.random() * 10 + 5))), // Simulação de valores
            }));

            return res.status(200).json(turnoverData);
        } catch (error) {
            console.error("Erro ao calcular turnover:", error);
            return res.status(500).json({ message: "Erro ao calcular turnover", error });
        }
    }

    async update(request: Request, response: Response) {
        const pedidoRepository = AppDataSource.getRepository(Pedido);
        const clienteRepository = AppDataSource.getRepository(Cliente);

        const { id } = request.params;
        const { cliente,
                nome,
                descricao,
                data_criacao,
                data_entrega,
                estado,
                categoria,
                tipo,
                peso,
                quantidade,
                volume,
                distancia,
                total,
                lucro,
            } = request.body;

        try {
            const pedido = await pedidoRepository.findOneBy({ id: Number(id) });
            if (!pedido) {
                return response.status(404).json({ message: 'Pedido não encontrado' });
            }

            const clienteFound = await clienteRepository.findOneBy({ id: cliente });
            if (!clienteFound) {
                return response.status(404).json({ message: "Cliente não encontrado" });
            }
            pedido.cliente = clienteFound;
            pedido.nome = nome;
            pedido.descricao = descricao;
            pedido.data_criacao = data_criacao;
            pedido.data_entrega = data_entrega;
            pedido.estado = estado;
            pedido.categoria = categoria;
            pedido.tipo = tipo;
            pedido.peso = peso;
            pedido.quantidade = quantidade;
            pedido.volume = volume;
            pedido.distancia = distancia;
            pedido.total = total;
            pedido.lucro = lucro;

            await pedidoRepository.save(pedido);

            return response.status(200).json(pedido);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao atualizar pedido', error });
        }
    }
}

export default new PedidoController();
