import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { AppDataSource } from '../database/data-source'; // Ajuste o caminho conforme necessário
import User from '../models/User'; // Ajuste o caminho conforme necessário

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'piikaachuuuu16@gmail.com', // seu email
        pass: 'louieandmary' // sua senha de app
    },
    tls: {
        rejectUnauthorized: false // Desabilita a verificação de certificados
    }
});

const recoverPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'E-mail é necessário' });
    }

    try {
        console.log("Tentando acessar o repositório User");
        const userRepository = AppDataSource.getRepository(User);
        console.log("Repositório acessado com sucesso");

        const user = await userRepository.findOne({ where: { login: email } });
        if (!user) {
            console.log("Usuário não encontrado");
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        console.log("Usuário encontrado:", user);

        const mailOptions = {
            from: 'piikaachuuuu16@gmail.com',
            to: email,
            subject: 'Recuperação de Senha',
            text: 'Este é um e-mail de teste para recuperação de senha. Implemente a lógica de recuperação aqui.'
        };

        await transporter.sendMail(mailOptions);
        console.log("E-mail enviado com sucesso");
        res.status(200).json({ message: 'E-mail de recuperação enviado para: ' + email });
    } catch (error: unknown) {
        console.error("Erro ao enviar e-mail:", error); // Log do erro
        const errorMessage = (error instanceof Error) ? error.message : 'Erro desconhecido';
        res.status(500).json({ message: 'Erro ao enviar e-mail', error: errorMessage });
    }
};


export { recoverPassword };
