import 'reflect-metadata';
import express from 'express';
import path from 'path';
import cors from 'cors'; // Importar CORS corretamente

import { AppDataSource } from './database/data-source';
import { router } from './routes';
import "./database/data-source";

const app = express();

// Configuração do CORS: Coloque isso antes de qualquer rota
app.use(cors({
    origin: 'http://localhost:5173', // Defina seu frontend
    methods: ['GET', 'PUT', 'POST', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Configurando arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'public/upload')));

// Middleware de parsing do JSON
app.use(express.json());

// Rotas
app.use(router);

// Iniciar o servidor
app.listen(3333, () => {
    console.log("Server started on port 3333");
    AppDataSource.initialize().then(() => {
        console.log("Database ok");
    });
});
