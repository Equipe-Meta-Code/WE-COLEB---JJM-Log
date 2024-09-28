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

const router = Router();
//router.post("/users", is(['Admin_Role', 'Admin/Vendedor_Role']), UserController.create);
router.post("/users", UserController.create);
router.post("/sessions", SessionController.create);
router.post("/permissions", PermissionController.create);
router.post("/roles", RoleController.create);
router.post("/departamentos", DepartamentoController.create);
router.post("/etapas", EtapaController.create);
router.post("/pedidos", PedidoController.create);
router.post("/etapapedido", EtapaPedidoController.create);


router.get("/pedidos", PedidoController.getAll); // Buscar todos os pedidos
router.get("/pedidos/:id", PedidoController.getById); // Buscar pedido por ID
router.get("/etapas", EtapaController.getAll);
router.get("/departamentos", DepartamentoController.getAll);
router.get("/etapapedido", EtapaPedidoController.getAll);
router.get('/etapapedido/pedido/:pedidoId', EtapaPedidoController.getByPedidoId);

router.put('/etapapedido/:id', EtapaPedidoController.update);

router.get("/users/roles", UserController.roles);
router.put("/updatePassword", UserController.updatePassword);


export { router };
