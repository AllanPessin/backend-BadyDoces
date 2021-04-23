import bcrypt from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin")
class Admin {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword () {
    this.password = bcrypt.hashSync(this.password, 8);
  };
}

export { Admin };
