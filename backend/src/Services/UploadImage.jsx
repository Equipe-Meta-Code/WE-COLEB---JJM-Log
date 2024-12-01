const multer  = require('multer');
const path = require('path');
const fs = require('fs');

const dir = './src/public/upload/images';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Configuração para armazenar imagens
module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/public/upload/images'); // Diretório onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // Extensões permitidas
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem (JPEG, PNG, GIF) são permitidos.'));
    }
  },
});