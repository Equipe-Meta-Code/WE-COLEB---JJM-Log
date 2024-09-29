import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientes1727114980676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'clientes',
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
                    name: 'cpf_cnpj',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clientes");
    }

}
