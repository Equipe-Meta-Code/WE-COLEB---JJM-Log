import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Pedido from "./Pedido";

@Entity('etapa_pedido')
class EtapaPedido {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nome: string;

    @Column({ type: 'varchar', nullable: false })
    departamento: string;

    @Column({ type: 'varchar', nullable: false })
    estado: string;

    @Column({ type: 'timestamp', nullable: true })
    data_conclusao: Date;

    @ManyToOne(() => Pedido)  
    @JoinColumn({ name: 'pedido_id' })
    pedido: Pedido;
}

export default EtapaPedido;
