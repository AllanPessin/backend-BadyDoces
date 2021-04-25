import { EntityRepository, Repository } from "typeorm";
import { Product } from "../models/Products";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> { }

export { ProductRepository };