import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDepartamentosPedidos1727183848377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'departamento_pedido',
            columns: [
                {
                    name: 'pedido_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'departamento_id',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }), true);

        await queryRunner.createForeignKey('departamento_pedido', new TableForeignKey({
            columnNames: ['pedido_id'],
            referencedTableName: 'pedidos',
            referencedColumnNames: ['id'],
            name: 'fk_pedido_pedido_',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
        }));

        await queryRunner.createForeignKey('departamento_pedido', new TableForeignKey({
            columnNames: ['departamento_id'],
            referencedTableName: 'departamentos',
            referencedColumnNames: ['id'],
            name: 'fk_departamento_pedido_',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('departamento_pedido', 'fk_pedido_pedido_');
        await queryRunner.dropForeignKey('departamento_pedido', 'fk_departamento_pedido_');
        await queryRunner.dropTable("departamento_pedido");
    }

}
