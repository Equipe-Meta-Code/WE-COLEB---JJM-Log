import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("departamentos")
class Departamentos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    nome: string;
}

export default Departamentos;