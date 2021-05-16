import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Product1619148160847 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id_product",
            type: "uuid",
            isPrimary: true,
            isUnique: true
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "price",
            type: "money"
          },
          {
            name: "amount",
            type: "int",
          },
          {
            name: "name_category",
            type: "varchar"
          }
        ],
        foreignKeys: [
          {
            name: "FKcategory",
            referencedTableName: "category",
            referencedColumnNames: ["category_name"],
            columnNames: ["name_category"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product");
  }
}
