import { EntityRepository, Repository } from "typeorm";
import { SalesProducts } from "../models/SalesProducts";

@EntityRepository(SalesProducts)
class SaleProductRepository extends Repository<SalesProducts> { }

export { SaleProductRepository };