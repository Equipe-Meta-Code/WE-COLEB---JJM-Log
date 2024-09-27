import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Departamento from "./Departamento";

@Entity('etapas') 
class Etapa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nome: string;

    @ManyToOne(() => Departamento)
    @JoinColumn({ name: 'departamento_id' })
    departamento: Departamento;
}

export default Etapa;
