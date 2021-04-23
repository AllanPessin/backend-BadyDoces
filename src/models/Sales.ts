import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Admin } from "./Administrator";

@Entity("sales")
class Sales {
  @PrimaryGeneratedColumn()
  readonly id_sales: string;

  @Column()
  value: number;

  @Column()
  costumer: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  delivered: boolean;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: "id" })
  admin: Admin;
}

export { Sales };
