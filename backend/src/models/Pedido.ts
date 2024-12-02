import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import  User from "./User";
import Cliente from "./Cliente";

@Entity('pedidos')
class Pedido {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nome: string;

    @Column({ type: 'varchar', nullable: true })
    descricao: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_criacao: Date;

    @Column({ type: 'timestamp', nullable: false })
    data_entrega: Date;

    @Column({ type: 'varchar', nullable: false })
    estado: string;

    @Column({ type: 'varchar', nullable: false })
    categoria: string;

    @Column({ type: 'varchar', nullable: true })
    tipo: string;

    @Column({ type: 'float', nullable: true })
    peso: number;

    @Column({ type: 'int', nullable: true })
    quantidade: number;

    @Column({ type: 'float', nullable: true })
    volume: number;

    @Column({ type: 'float', nullable: true })
    distancia: number;

    @Column({ type: 'float', nullable: true })
    total: number;
    
    @Column({ type: 'float', nullable: true })
    lucro: number;

    @Column({ type: 'float', nullable: true })
    gastos: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;
}

export default Pedido;
