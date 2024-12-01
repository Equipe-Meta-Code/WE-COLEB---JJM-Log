import "reflect-metadata";
import { DataSource } from "typeorm";

import User from "../models/User";
import Role from "../models/Role";
import Permission from "../models/Permission";
import Departamento from "../models/Departamento";
import Cliente from "../models/Cliente";
import Endereco from "../models/Endereco";
import Etapa from "../models/Etapa";
import EtapaPedido from "../models/EtapaPedido";
import Pedido from "../models/Pedido";
import UserFiles from "../models/UserFiles";
import CompanyFiles from "../models/CompanyFiles";

import { CreateUsers1726672168699 } from "./migrations/1726672168699-CreateUsers";
import { CreatePermissions1726679330555 } from "./migrations/1726679330555-CreatePermissions";
import { CreateRoles1726679379911 } from "./migrations/1726679379911-CreateRoles";
import { CreatePermissionsRoles1726679445904 } from "./migrations/1726679445904-CreatePermissionsRoles";
import { CreateUsersRoles1726679463665 } from "./migrations/1726679463665-CreateUsersRoles";
import { CreateClientes1727114980676 } from "./migrations/1727114980676-CreateClientes";
import { CreateEndereco1727114998737 } from "./migrations/1727114998737-CreateEndereco";
import { CreatePedidos1727115009916 } from "./migrations/1727115009916-CreatePedidos";
import { CreateDepartamentos1727183720141 } from "./migrations/1727183720141-CreateDepartamentos";
import { CreateEtapas1727183768483 } from "./migrations/1727183768483-CreateEtapas";
import { CreateEtapasPedidos1727183789278 } from "./migrations/1727183789278-CreateEtapasPedidos";
import { CreateUserFiles1729473571831 } from "./migrations/1729473571831-CreateUserFiles";
import { CreateCompanyFiles1733027003518 } from "./migrations/1733027003518-CreateCompanyFiles";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "wecollab",
    synchronize: true,
    logging: false,
    entities: [User, Role, Permission, Cliente, Departamento, Endereco, Etapa, EtapaPedido, Pedido, UserFiles, CompanyFiles],
    migrations: [CreateUsers1726672168699,
                CreatePermissions1726679330555,
                CreateRoles1726679379911,
                CreatePermissionsRoles1726679445904,
                CreateUsersRoles1726679463665,
                CreateClientes1727114980676,
                CreateEndereco1727114998737,
                CreatePedidos1727115009916,
                CreateDepartamentos1727183720141,
                CreateEtapas1727183768483,
                CreateEtapasPedidos1727183789278,
                CreateUserFiles1729473571831,
                CreateCompanyFiles1733027003518],
    subscribers: [],
})
