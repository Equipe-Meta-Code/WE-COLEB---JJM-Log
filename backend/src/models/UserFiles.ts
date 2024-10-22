import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user_files')
class UserFiles {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    rota: string;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'int', nullable: false })
    origem: number;
}

export default UserFiles;
