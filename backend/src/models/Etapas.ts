import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Departamentos from './Departamentos'; // Importação correta do model Departamentos

@Entity('etapas')
class Etapas {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(() => Departamentos, { onDelete: 'CASCADE', onUpdate: 'SET NULL' }) 
    departamento: Departamentos; // Aqui definimos a relação com a tabela departamentos
}

export default Etapas;