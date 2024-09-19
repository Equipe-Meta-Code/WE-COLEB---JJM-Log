import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PermissionController from './controllers/PermissionController';
import RoleController from './controllers/RoleController';

import { is } from './middlewares/permission';

const router = Router();
//router.post("/users", is(['Admin_Role', 'Admin/Vendedor_Role']), UserController.create);
router.post("/users", UserController.create);
router.post("/sessions", SessionController.create);
router.post("/permissions", PermissionController.create);
router.post("/roles", RoleController.create);

router.get("/users/roles", UserController.roles);
router.put("/updatePassword", UserController.updatePassword);


export { router };
