import { EntityRepository, Repository } from "typeorm";
import { Sales } from "../models/Sales";

@EntityRepository (Sales)
class SaleRepository extends Repository<Sales> {}

export { SaleRepository };
