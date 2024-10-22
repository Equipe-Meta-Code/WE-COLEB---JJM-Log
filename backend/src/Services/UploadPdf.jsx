// Incluir as bibliotecas
// Upload de arquivos
const multer  = require('multer');

// O módulo path permite interagir com o sistema de arquivos
const path = require('path');

// Realizar upload do arquivo
module.exports = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        console.log("Salvando arquivo em: ./src/public/upload/pdf");
        cb(null, './src/public/upload/pdf');
      },
      filename: (req, file, cb) => {
        console.log("Nome do arquivo:", file.originalname);
        cb(null, Date.now().toString() + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
      }
    }),
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
  });
  