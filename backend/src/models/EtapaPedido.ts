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

    @Column({ type: 'varchar', length: 255, nullable: true })
    etapa_desfeita: string;

    @ManyToOne(() => Pedido)  
    @JoinColumn({ name: 'pedido_id' })
    pedido: Pedido;
}

export default EtapaPedido;
