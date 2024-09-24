import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Cliente from "./Cliente";

@Entity('endereco')
class Endereco {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    cep: string;

    @Column({ type: 'varchar', nullable: true })
    rua: string;

    @Column({ type: 'varchar', nullable: true })
    bairro: string;

    @Column({ type: 'varchar', nullable: true })
    estado: string;

    @Column({ type: 'varchar', nullable: true })
    cidade: string;

    @Column({ type: 'varchar', nullable: true })
    numero: string;

    @Column({ type: 'varchar', nullable: true })
    complemento: string;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;
}

export default Endereco;
