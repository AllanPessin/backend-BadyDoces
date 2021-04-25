import { EntityRepository, Repository } from "typeorm";
import { Admin } from "../models/Administrator";

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin> { }

export { AdminRepository };