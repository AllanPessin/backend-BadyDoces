import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./Products";
import { Sales } from "./Sales";
import { v4 as uuid } from "uuid";

@Entity("sale_product")
class SalesProducts {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  sale_id: number;

  @ManyToOne(() => Sales)
  @JoinTable({ name: "sale_id" })
  sales: Sales;

  @Column()
  value: number;
  
  constructor() {
    if (!this.id) {
      this.id = uuid();
    };
  }
}

export { SalesProducts };