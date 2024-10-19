import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEtapas1727183768483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'etapas',
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
                    name: 'fixo',
                    type: 'varchar',
                },
                {
                    name: 'ordem',
                    type: 'int',
                },
                {
                    name: 'departamento_id',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }), true);

        await queryRunner.createForeignKey('etapas', new TableForeignKey({
            columnNames: ['departamento_id'],
            referencedTableName: 'departamentos',
            referencedColumnNames: ['id'],
            name: 'fk_departamento_etapa_',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('etapas', 'fk_departamento_etapa_');
        await queryRunner.dropTable("etapas");
    }

}
