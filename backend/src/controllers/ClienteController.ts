import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import Cliente from '../models/Cliente';

class ClienteController {

    // Método para cadastrar um novo cliente
    async create(request: Request, response: Response) {
        const clienteRepository = AppDataSource.getRepository(Cliente);

        const { nome, cpf_cnpj } = request.body;

        // Verifica se já existe um cliente com o mesmo CPF/CNPJ
        const existCliente = await clienteRepository.findOneBy({ cpf_cnpj });

        if (existCliente) {
            return response.status(400).json({ message: 'Cliente já existe!' });
        }

        // Cria o novo cliente no banco de dados
        const cliente = clienteRepository.create({
            nome,
            cpf_cnpj,
        });

        await clienteRepository.save(cliente);

        return response.status(201).json(cliente);
    }

    // Método para listar todos os clientes
    async list(request: Request, response: Response) {
        const clienteRepository = AppDataSource.getRepository(Cliente);

        try {
            const clientes = await clienteRepository.find();
            return response.status(200).json(clientes);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao listar clientes', error });
        }
    }

    // Método para buscar um cliente pelo ID
    async getClienteById(request: Request, response: Response) {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        const { id } = request.params;

        try {
            const cliente = await clienteRepository.findOneBy({ id: Number(id) });

            if (!cliente) {
                return response.status(404).json({ message: 'Cliente não encontrado' });
            }

            return response.status(200).json(cliente);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao buscar cliente', error });
        }
    }

    // Método para atualizar os dados de um cliente
    async update(request: Request, response: Response) {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        const { id } = request.params;
        const { nome, cpf_cnpj } = request.body;

        try {
            const cliente = await clienteRepository.findOneBy({ id: Number(id) });

            if (!cliente) {
                return response.status(404).json({ message: 'Cliente não encontrado' });
            }

            cliente.nome = nome;
            cliente.cpf_cnpj = cpf_cnpj;

            await clienteRepository.save(cliente);

            return response.status(200).json(cliente);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao atualizar cliente', error });
        }
    }

    // Método para deletar um cliente
    async delete(request: Request, response: Response) {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        const { id } = request.params;

        try {
            const cliente = await clienteRepository.findOneBy({ id: Number(id) });

            if (!cliente) {
                return response.status(404).json({ message: 'Cliente não encontrado' });
            }

            await clienteRepository.delete(id);

            return response.status(200).json({ message: 'Cliente deletado com sucesso' });
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao deletar cliente', error });
        }
    }
}

export default new ClienteController();
