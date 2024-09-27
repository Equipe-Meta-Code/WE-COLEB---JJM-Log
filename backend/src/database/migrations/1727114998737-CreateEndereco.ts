import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEndereco1727114998737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'endereco',
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
                    name: 'cep',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'rua',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'bairro',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'estado',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'cidade',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'numero',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'complemento',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'cliente_id',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }), true);

        await queryRunner.createForeignKey('endereco', new TableForeignKey({
            columnNames: ['cliente_id'],
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            name: 'fk_cliente_endereco_',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('endereco', 'fk_cliente_endereco_');
        await queryRunner.dropTable("endereco");
    }

}
