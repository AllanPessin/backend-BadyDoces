import { EntityRepository, Repository } from "typeorm";
import { Category } from "../models/Categories";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> { }

export { CategoryRepository };