import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Category } from "./Categories";
import { v4 as uuid } from "uuid";

@Entity("product")
class Product {
  @PrimaryColumn()
  readonly id_product: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column()
  name_category: string

  @ManyToOne(() => Category)
  @JoinColumn({ 
    name: "name_category",
    referencedColumnName: "category_name" 
  })
  category: Category

  constructor() {
    if (!this.id_product) {
      this.id_product = uuid();
    }
  }
}

export { Product };
