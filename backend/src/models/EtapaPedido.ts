import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Pedido from "./Pedido";
import Departamento from "./Departamento";

@Entity('etapa_pedido')
class EtapaPedido {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nome: string;

    @Column({ type: 'varchar', nullable: false })
    estado: string;

    @Column({ type: 'timestamp', nullable: true })
    data_conclusao: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    etapa_desfeita: string;

    @ManyToOne(() => Pedido)  
    @JoinColumn({ name: 'pedido_id' })
    pedido: Pedido;

    @ManyToOne(() => Departamento)  
    @JoinColumn({ name: 'departamento_id' })
    departamento: Departamento;
}

export default EtapaPedido;
