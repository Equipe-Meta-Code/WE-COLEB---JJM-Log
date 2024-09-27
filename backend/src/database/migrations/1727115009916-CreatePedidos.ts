import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePedidos1727115009916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'pedidos',
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
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'cliente_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'descricao',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'data_criacao',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'data_entrega',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'categoria',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'tipo',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'peso',
                    type: 'float',
                    isNullable: true,
                },
                {
                    name: 'quantidade',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'volume',
                    type: 'float',
                    isNullable: true,
                },
                {
                    name: 'distancia',
                    type: 'float',
                    isNullable: true,
                },
            ],
        }), true);

        await queryRunner.createForeignKey('pedidos', new TableForeignKey({
            columnNames: ['cliente_id'],
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            name: 'fk_cliente_pedido_',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
        }));

        await queryRunner.createForeignKey('pedidos', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            name: 'fk_user_pedido_',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('pedidos', 'fk_cliente_pedido_');
        await queryRunner.dropForeignKey('pedidos', 'fk_user_pedido_');
        await queryRunner.dropTable("pedidos");
    }

}
