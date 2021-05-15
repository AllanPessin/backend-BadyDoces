import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("category")
class Category {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  category_name: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category };
