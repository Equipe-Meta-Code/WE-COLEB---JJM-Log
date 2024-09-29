import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('clientes')
class Cliente {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nome: string;

    @Column({ type: 'varchar', nullable: false })
    cpf_cnpj: string;
}

export default Cliente;
