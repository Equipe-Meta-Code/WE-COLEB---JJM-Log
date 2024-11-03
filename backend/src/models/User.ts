// models/User.ts
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Repository } from "typeorm";
import { getRepository } from "typeorm"; // Importa o getRepository para usar no método
import Role from "./Role";

@Entity("users")
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    nome: string;

    @Column('varchar', { length: 60, nullable: false })
    cpf: string;

    @Column('varchar', { length: 100, nullable: true })
    login: string;

    @Column('varchar', { length: 100, nullable: true })
    senha: string;

    @Column('timestamp', { default: 'CURRENT_TIMESTAMP' })
    data_criacao: Date;

    @ManyToMany(() => Role)
    @JoinTable({
        name: "users_roles",
        joinColumns: [{ name: "user_id" }],
        inverseJoinColumns: [{ name: "role_id" }]
    })
    roles: Role[];

    // Método estático para encontrar um usuário pelo email
    static async findByEmail(login: string): Promise<User | null> {
        const userRepository: Repository<User> = getRepository(User);
        return await userRepository.findOne({ where: { login: login } }); // Use o campo correto para e-mail
    }
}

export default User;
