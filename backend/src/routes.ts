import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PermissionController from './controllers/PermissionController';
import RoleController from './controllers/RoleController';
import { is } from './middlewares/permission';
import DepartamentoController from './controllers/DepartamentoController';
import EtapaController from './controllers/EtapaController';
import PedidoController from './controllers/PedidoController';
import EtapaPedidoController from './controllers/EtapaPedido.Controller';
import ClienteController from './controllers/ClienteController';
import UserFilesController from './controllers/UserFilesController';
import { recoverPassword } from './controllers/authController'; // Importa o recoverPassword

const uploadPdf = require('./Services/UploadPdf');

const router = Router();

// Suas rotas existentes
router.post("/users", UserController.create);
router.post("/sessions", SessionController.create);
router.post("/permissions", PermissionController.create);
router.post("/roles", RoleController.create);
router.post("/departamentos", DepartamentoController.create);
router.post("/etapas", EtapaController.create);
router.post("/pedidos", PedidoController.create);
router.post("/etapapedido", EtapaPedidoController.create);
router.post('/upload', uploadPdf.single('pdf'), UserFilesController.create);

// Novas rotas de recuperação de senha
router.post('/recover-password', recoverPassword); // Adiciona a rota de recuperação de senha

// Resto das suas rotas
router.get("/arquivos", UserFilesController.getAll);
router.get("/users", UserController.getAll);
router.get("/usersid/:id", UserController.getById);
router.get("/pedidos", PedidoController.getAll);
router.get("/pedidos/:id", PedidoController.getById);
router.put("/pedidos/:id", PedidoController.update);
router.get("/etapas", EtapaController.getAll);
router.get("/departamentos", DepartamentoController.getAll);
router.get("/etapapedido", EtapaPedidoController.getAll);
router.get('/etapapedido/pedido/:pedidoId', EtapaPedidoController.getByPedidoId);

router.get("/pedidosDashboard", PedidoController.getAll);

router.put("/etapas/:id", EtapaController.update);
router.put('/etapapedido/:id', EtapaPedidoController.update);

router.delete("/etapas/:id", EtapaController.delete);

router.get("/users/roles", UserController.roles);
router.put("/updatePassword", UserController.updatePassword);

router.post("/clientes", ClienteController.create); // Cadastrar cliente
router.get("/clientes", ClienteController.list); // Listar clientes
router.get("/clientes/:id", ClienteController.getClienteById); // Buscar cliente por ID
router.put("/clientes/:id", ClienteController.update); // Atualizar cliente
router.delete("/clientes/:id", ClienteController.delete); // Deletar cliente
router.delete('/arquivos/:id', UserFilesController.delete);

export { router };
