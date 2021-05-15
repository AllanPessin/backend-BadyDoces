import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SaleProductCreate1619189924322 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table ({
        name: "sale_product",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "product_id",
            type: "uuid",
          },
          {
            name: "sale_id",
            type: "uuid",
          },
          {
            name: "value",
            type: "money",
          },
        ],
        foreignKeys: [
          {
            name: "FKprodutc_sale",
            referencedTableName: "product",
            referencedColumnNames: ["id_product"],
            columnNames: ["product_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKsale_produtc",
            referencedTableName: "sales",
            referencedColumnNames: ["id_sale"],
            columnNames: ["sale_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("sale_product");
  }

}
