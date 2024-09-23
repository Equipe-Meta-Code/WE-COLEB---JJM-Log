import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "../models/User";
import Role from "../models/Role";
import Permission from "../models/Permission";
import Departamentos from "../models/Departamentos";
import Etapas from "../models/Etapas";
import { CreateUsers1726672168699 } from "./migrations/1726672168699-CreateUsers";
import { CreatePermissions1726679330555 } from "./migrations/1726679330555-CreatePermissions";
import { CreateRoles1726679379911 } from "./migrations/1726679379911-CreateRoles";
import { CreatePermissionsRoles1726679445904 } from "./migrations/1726679445904-CreatePermissionsRoles";
import { CreateUsersRoles1726679463665 } from "./migrations/1726679463665-CreateUsersRoles";
import { CreateDepartamentos1727086743759 } from "./migrations/1727086743759-CreateDepartamentos";
import { CreateEtapas1727122773821 } from "./migrations/1727124734714-CreateEtapas";



export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "sofia",
    database: "wecollab",
    synchronize: true,
    logging: false,
    entities: [User, Role, Permission, Departamentos, Etapas],
    migrations: [CreateUsers1726672168699,
                CreatePermissions1726679330555,
                CreateRoles1726679379911,
                CreatePermissionsRoles1726679445904,
                CreateUsersRoles1726679463665,
                CreateDepartamentos1727086743759,
                CreateEtapas1727122773821],
    subscribers: [],
})
