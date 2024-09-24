import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Pedido from "./Pedido";
import Etapa from "./Etapa";

@Entity('etapa_pedido')
class EtapaPedido {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    estado: string;

    @ManyToOne(() => Pedido)  
    @JoinColumn({ name: 'pedido_id' })
    pedido: Pedido;

    @ManyToOne(() => Etapa)
    @JoinColumn({ name: 'etapa_id' })
    etapa: Etapa;
}
export default EtapaPedido;
