//Arquivos do mural de avisos no portal de funcionários
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompanyFiles1733027003518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'company_files',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isNullable: false,
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'rota',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'origem',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'tipoImg',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: "data_criacao",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                }
                
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("company_files");
    }

}
