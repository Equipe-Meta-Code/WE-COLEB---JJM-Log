//Arquivos do mural de avisos no portal de funcionários
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('company_files')
class CompanyFiles {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nome: string;

    @Column({ type: 'varchar', nullable: false })
    rota: string;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'int', nullable: false })
    origem: number;

    @Column({ type: 'varchar', nullable: false })
    tipoImg: string;

    @Column('timestamp', { default: 'CURRENT_TIMESTAMP'} )
    data_criacao: Date;
    
}

export default CompanyFiles;
