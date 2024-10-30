import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('clientes')
class Cliente {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    cnpj: string;

    @Column({ type: 'varchar', nullable: false })
    razao_social: string;

    @Column({ type: 'varchar', nullable: false })
    nome_fantasia: string;

    @Column({ type: 'varchar', nullable: false })
    inscricao_municipal: string;

    @Column({ type: 'varchar', nullable: false })
    inscricao_estadual: string;

    @Column({ type: 'varchar', nullable: false })
    contribuinte: string;

    @Column({ type: 'varchar', nullable: false })
    telefone: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    natureza_operacao: string;

    @Column({ type: 'varchar', nullable: false })
    ramo_atividade: string;

    @Column({ type: 'varchar', nullable: false })
    rntrc: string;

    @Column({ type: 'varchar', nullable: false })
    validade_rntrc: string;

    @Column({ type: 'varchar', nullable: false })
    valor_fixo: string;

    @Column({ type: 'varchar', nullable: false })
    valor_adicional: string;
}

export default Cliente;