import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user_files')
class UserFiles {
    
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
    tipo: string;

    @Column('timestamp', { default: 'CURRENT_TIMESTAMP'} )
    data_criacao: Date;
    
}

export default UserFiles;
