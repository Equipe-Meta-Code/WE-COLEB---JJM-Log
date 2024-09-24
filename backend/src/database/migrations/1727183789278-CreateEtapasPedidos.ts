import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEtapasPedidos1727183789278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'etapa_pedido',
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
                    name: 'pedido_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'etapa_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'estado',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }), true);

        await queryRunner.createForeignKey('etapa_pedido', new TableForeignKey({
            columnNames: ['pedido_id'],
            referencedTableName: 'pedidos',
            referencedColumnNames: ['id'],
            name: 'fk_pedido_etapa_pedido_',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
        }));

        await queryRunner.createForeignKey('etapa_pedido', new TableForeignKey({
            columnNames: ['etapa_id'],
            referencedTableName: 'etapas',
            referencedColumnNames: ['id'],
            name: 'fk_etapa_etapa_pedido_',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('etapa_pedido', 'fk_pedido_etapa_pedido_');
        await queryRunner.dropForeignKey('etapa_pedido', 'fk_etapa_etapa_pedido_');
        await queryRunner.dropTable("etapa_pedido");
    }

}
