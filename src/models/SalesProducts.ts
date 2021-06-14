import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Products";
import { Sales } from "./Sales";

@Entity("sale_product")
class SalesProducts {
  @PrimaryColumn()
  id: string;

  @Column()
  product_id: string;

  @ManyToMany(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id_product"
  })
  product: Product;

  @Column()
  sale_id: string;

  @ManyToMany(() => Sales)
  @JoinColumn({
    name: "sale_id",
    referencedColumnName: "id_sale"
  })
  sales: Sales;

  @Column()
  value: number;

  @Column()
  amount: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SalesProducts };

