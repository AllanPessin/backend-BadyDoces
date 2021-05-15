import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AdministratorCreate1618946759810 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "admin",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true
          },
          {
            name: "password",
            type: "varchar"
          }
        ]
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("admin");
  }
}
