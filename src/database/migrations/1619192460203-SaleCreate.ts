import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SalesCreate1618948291183 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "sales",
        columns: [
          {
            name: "id_sale",
            type: "uuid",
            isPrimary: true,
            isUnique: true
          },
          {
            name: "value",
            type: "money"
          },
          {
            name: "costumer",
            type: "varchar"
          },
          {
            name: "delivered",
            type: "boolean",
            default: false
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "admin_id",
            type: "uuid"
          }
        ],
        foreignKeys: [
          {
            name: "FKadmin",
            referencedTableName: "admin",
            referencedColumnNames: ["id"],
            columnNames: ["admin_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("sales");
  }
}
