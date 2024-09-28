import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEtapas1727122773821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'etapas',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'id_departamento',
                        type: 'int',
                        isNullable: true, // Permitir valores nulos
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'etapas',
            new TableForeignKey({
                columnNames: ['id_departamento'],
                referencedColumnNames: ['id'],
                referencedTableName: 'departamentos',
                name: 'fk_departamentos',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("etapas");
    }
}
