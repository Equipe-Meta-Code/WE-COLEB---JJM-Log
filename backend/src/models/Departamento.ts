import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('departamentos')
class Departamento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nome: string;
}

export default Departamento;