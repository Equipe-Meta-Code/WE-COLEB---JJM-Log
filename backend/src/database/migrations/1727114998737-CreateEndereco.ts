import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEndereco1727114998737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria a tabela 'endereco'
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

        // Cria a chave estrangeira entre 'endereco' e 'clientes'
        await queryRunner.createForeignKey('endereco', new TableForeignKey({
            columnNames: ['cliente_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'clientes',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('endereco', 'FK_endereco_cliente_id');
        await queryRunner.dropTable('endereco');
    }

}
