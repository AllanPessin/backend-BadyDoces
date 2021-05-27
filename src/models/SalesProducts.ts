import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Products";
import { Sales } from "./Sales";

@Entity("sale_product")
class SalesProducts {
  @PrimaryColumn()
  id: string;

  @Column()
  product_id: number;

  @ManyToMany(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product[];

  @Column()
  sale_id: number;

  @ManyToMany(() => Sales)
  @JoinTable({ name: "sale_id" })
  sales: Sales[];

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
