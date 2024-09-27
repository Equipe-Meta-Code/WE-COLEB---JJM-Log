import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDepartamentos1727086743759 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'departamentos',
                columns: [
                    {
                        name: 'id', 
                        type: 'int', 
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },

                    {
                        name: 'nome', 
                        type: 'varchar', 
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("departamentos");
    }

}
