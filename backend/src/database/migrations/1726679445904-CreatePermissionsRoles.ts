import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePermissionsRoles1726679445904 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'permissions_roles',
                columns: [
                    {name: 'role_id', type: 'int', isNullable: true},
                    {name: 'permission_id', type: 'int', isNullable: true }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'permissions_roles',
            new TableForeignKey({
                columnNames: ['permission_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permissions',
                name: 'fk_permissions_roles_',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )

        await queryRunner.createForeignKey(
            'permissions_roles',
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                name: 'fk_roles_permissions_',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('permissions_roles', 'fk_roles_permissions_');

        await queryRunner.dropForeignKey('permissions_roles', 'fk_permissions_roles_');

        await queryRunner.dropTable('permissions_roles');
    }

}
