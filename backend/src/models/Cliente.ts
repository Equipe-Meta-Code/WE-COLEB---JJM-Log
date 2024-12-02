import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import Endereco from "./Endereco";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnpj: string;

    @Column()
    razao_social: string;

    @Column()
    nome_fantasia: string;

    @Column()
    inscricao_municipal: string;

    @Column()
    inscricao_estadual: string;

    @Column()
    contribuinte: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @Column()
    natureza_operacao: string;

    @Column()
    ramo_atividade: string;

    @Column()
    rntrc: string;

    @Column()
    validade_rntrc: string;

    @Column()
    valor_fixo: string;

    @Column()
    valor_adicional: string;

    @CreateDateColumn({ type: 'timestamp' })
    data_criacao: Date;

    @OneToMany(() => Endereco, (endereco) => endereco.cliente, {
        cascade: true, // Garante que alterações em cliente afetam endereços
    })
    enderecos: Endereco[]; // Aqui está a propriedade que estava ausente
}

export default Cliente;
