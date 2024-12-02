import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Endereco from "../models/Endereco";
import Cliente from "../models/Cliente";

class EnderecoController {
    async create(req: Request, res: Response): Promise<Response> {
        const { id } = req.params; // ID do cliente vindo da rota
        const { rua, numero, bairro, cidade, estado, cep, complemento } = req.body;

        try {
            const enderecoRepository = AppDataSource.getRepository(Endereco);
            const clienteRepository = AppDataSource.getRepository(Cliente);

            // Verificar se o cliente existe
            const cliente = await clienteRepository.findOneBy({ id: Number(id) });

            if (!cliente) {
                return res.status(404).json({ error: "Cliente não encontrado" });
            }

            // Criar e associar o endereço ao cliente
            const endereco = enderecoRepository.create({
                rua,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                complemento,
                cliente, // Relacionamento com o cliente
            });

            await enderecoRepository.save(endereco);

            return res.status(201).json(endereco); // Retorna o endereço criado
        } catch (error) {
            return res.status(400).json({
                error: "Erro ao criar o endereço",
                details: (error as Error).message, // Trata o tipo do erro
            });
        }
    }

    async getByClienteId(req: Request, res: Response): Promise<Response> {
        const { id } = req.params; // ID do cliente vindo da rota

        try {
            const enderecoRepository = AppDataSource.getRepository(Endereco);

            // Busca todos os endereços relacionados ao cliente pelo relacionamento
            const enderecos = await enderecoRepository.find({
                where: { cliente: { id: Number(id) } },
                relations: ["cliente"], // Inclui informações do cliente
            });

            return res.status(200).json(enderecos); // Retorna os endereços encontrados
        } catch (error) {
            return res.status(400).json({
                error: "Erro ao buscar endereços",
                details: (error as Error).message, // Trata o tipo do erro
            });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { clienteId, enderecoId } = req.params; // IDs do cliente e do endereço
        const { rua, numero, bairro, cidade, estado, cep, complemento } = req.body;
    
        try {
            const enderecoRepository = AppDataSource.getRepository(Endereco);
    
            // Buscar o endereço pelo ID e verificar se pertence ao cliente
            const endereco = await enderecoRepository.findOne({
                where: {
                    id: Number(enderecoId),
                    cliente: { id: Number(clienteId) }, // Verifica se o endereço pertence ao cliente
                },
                relations: ["cliente"],
            });
    
            if (!endereco) {
                return res.status(404).json({ error: "Endereço não encontrado ou não pertence ao cliente" });
            }
    
            // Atualizar os dados do endereço
            enderecoRepository.merge(endereco, { rua, numero, bairro, cidade, estado, cep, complemento });
    
            await enderecoRepository.save(endereco);
    
            return res.status(200).json(endereco); // Retorna o endereço atualizado
        } catch (error) {
            return res.status(400).json({
                error: "Erro ao atualizar o endereço",
                details: (error as Error).message, // Trata o tipo do erro
            });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params; // ID do endereço vindo da rota

        try {
            const enderecoRepository = AppDataSource.getRepository(Endereco);

            // Verificar se o endereço existe
            const endereco = await enderecoRepository.findOneBy({ id: Number(id) });

            if (!endereco) {
                return res.status(404).json({ error: "Endereço não encontrado" });
            }

            // Excluir o endereço
            await enderecoRepository.remove(endereco);

            return res.status(200).json({ message: "Endereço excluído com sucesso" });
        } catch (error) {
            return res.status(400).json({
                error: "Erro ao excluir o endereço",
                details: (error as Error).message, // Trata o tipo do erro
            });
        }
    }
}

export default new EnderecoController();