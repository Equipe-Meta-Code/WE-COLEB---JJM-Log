import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user_files')
class UserFiles {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    file_path: string;

    @Column({ type: 'int', nullable: false })
    user_id: number;
}

export default UserFiles;
