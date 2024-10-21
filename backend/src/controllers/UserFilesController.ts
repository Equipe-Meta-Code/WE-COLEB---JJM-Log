import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import UserFiles from '../models/UserFiles';

/* import multer from 'multer';
import path from 'path';
import fs from 'fs';

import 'reflect-metadata'; */




// para salvar PDFs
/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = '../uploads/pdfs';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
}); */

/* const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas arquivos PDF são permitidos'));
        }
    }
}); */

class UserFilesController {
/*     constructor(app) {
        this.app = app;

        // Define routes
        this.routes();
    } */

    /* routes() {
        // Endpoint to upload the PDF
        this.app.post('/upload-pdf', upload.single('pdf'), this.uploadPDF.bind(this));

        // Get methods for fetching files
        this.app.get('/get-holerites/:userId', this.getHolerites.bind(this));
        this.app.get('/get-atestados/:userId', this.getAtestados.bind(this));
        this.app.get('/get-registros-ponto/:userId', this.getRegistrosPonto.bind(this));
    } */

    async create(req: Request, res: Response): Promise<Response> {
        const { file, userId} = req.body;
        
        const userFilesRepository = AppDataSource.getRepository(UserFiles);


        try {
            const userFiles = userFilesRepository.create({
                file_path: file,
                user_id: 1,
            });

            await userFilesRepository.save(userFiles);

            return res.status(201).json(userFiles);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar pedido", error });
        }


    }

/*     async uploadPDF(req: Request, res: Response) {
        const { userId } = req.body;
        const filePath = req.file?.path;

        if (!filePath || !userId) {
            console.error("File path or userId missing:", { filePath, userId });
            return res.status(400).json({ message: 'Faltam dados' });
        }

        try {
            await AppDataSource.query(
                'INSERT INTO user_files (user_id, file_path) VALUES (?, ?)',
                [userId, filePath]
            );
            res.status(200).json({ message: 'Arquivo enviado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar no banco de dados' });
        }
    } */
/* 
    async getHolerites(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const files = await AppDataSource.query('SELECT file_path FROM user_files WHERE file_type = "holerite" AND user_id = ?', [userId]);
            res.json(files);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar holerites' });
        }
    } */

/*     async getAtestados(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const files = await AppDataSource.query('SELECT file_path FROM user_files WHERE file_type = "atestados" AND user_id = ?', [userId]);
            res.json(files);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar atestados' });
        }
    }

    async getRegistrosPonto(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const files = await AppDataSource.query('SELECT file_path FROM user_files WHERE file_type = "registros-ponto" AND user_id = ?', [userId]);
            res.json(files);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar registros de ponto' });
        }
    } */
}
export default new UserFilesController();