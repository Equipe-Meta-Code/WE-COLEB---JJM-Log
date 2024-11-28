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
                    name: 'cnpj',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'razao_social',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'nome_fantasia',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'inscricao_municipal',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'inscricao_estadual',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'contribuinte',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'telefone',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'natureza_operacao',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'ramo_atividade',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'rntrc',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'validade_rntrc',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'valor_fixo',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'valor_adicional',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'data_criacao',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clientes");
    }

}
