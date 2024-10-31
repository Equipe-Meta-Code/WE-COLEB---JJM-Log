import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import Cliente from '../models/Cliente';

class ClienteController {

    // Método para cadastrar um novo cliente
    async create(request: Request, response: Response) {
        const clienteRepository = AppDataSource.getRepository(Cliente);

        const { cnpj, razao_social, nome_fantasia, inscricao_municipal, inscricao_estadual, contribuinte, telefone, email, natureza_operacao, ramo_atividade, rntrc, validade_rntrc, valor_adicional, valor_fixo } = request.body;

        // Verifica se já existe um cliente com o mesmo CNPJ
        const existCliente = await clienteRepository.findOneBy({ cnpj });

        if (existCliente) {
            return response.status(400).json({ message: 'Cliente já existe!' });
        }

        // Cria o novo cliente no banco de dados
        const cliente = clienteRepository.create({
            cnpj,
            razao_social,
            nome_fantasia, 
            inscricao_municipal, 
            inscricao_estadual, 
            contribuinte, 
            telefone,
            email,
            natureza_operacao,
            ramo_atividade, 
            rntrc,
            validade_rntrc,
            valor_fixo,
            valor_adicional,
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
            return response.status(500).json({ message: 'Erro ao buscar clientee', error });
        }
    }

    // Método para atualizar os dados de um cliente
    async update(request: Request, response: Response) {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        const { id } = request.params;
        const { cnpj, razao_social, nome_fantasia, inscricao_municipal, inscricao_estadual, contribuinte, telefone, email, natureza_operacao, ramo_atividade, rntrc, validade_rntrc, valor_adicional, valor_fixo } = request.body;

        try {
            const cliente = await clienteRepository.findOneBy({ id: Number(id) });

            if (!cliente) {
                return response.status(404).json({ message: 'Cliente não encontrado' });
            }

            cliente.cnpj = cnpj;
            cliente.razao_social = razao_social;
            cliente.nome_fantasia = nome_fantasia;
            cliente.inscricao_municipal = inscricao_municipal;
            cliente.inscricao_estadual = inscricao_estadual;
            cliente.contribuinte = contribuinte;
            cliente.telefone = telefone;
            cliente.email = email;
            cliente.natureza_operacao = natureza_operacao;
            cliente.ramo_atividade = ramo_atividade;
            cliente.rntrc = rntrc;
            cliente.validade_rntrc = validade_rntrc;
            cliente.valor_adicional = valor_adicional;
            cliente.valor_fixo = valor_fixo;


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