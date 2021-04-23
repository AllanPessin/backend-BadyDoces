import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AdministratorCreate1618946759810 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"");
    await queryRunner.createTable(
      new Table({
        name: "admin",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
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
  };

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("admin");
    await queryRunner.query("DROP EXTENSION \"uuid-ossp\"");
  };
};
