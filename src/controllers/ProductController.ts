import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { ProductRepository } from "../repositories/ProductRepository";

class ProductController {
  async create (request: Request, resposne: Response) {
    const { id_product, name, price, name_category } = request.body;

    const productReposiory = await getCustomRepository(ProductRepository);
    const categoryReposiory = await getCustomRepository(CategoryRepository);

    const productExists = await productReposiory.findOne({ name });
    const categoryExists = await categoryReposiory.findOne({ id: name_category });

    if (productExists) {
      return resposne.status(400).json({
        error: "Product already exists"
      })
    } else if (!categoryExists) {
      return response.status(400).json({
        error: "Category doesn't exists"
      })
    };

    const product = productReposiory.create({
      id_product,
      name,
      price,
      name_category: categoryExists.category_name
    });

    await productReposiory.save(product);

    return response.status(200).json(product);
  };

}

export { ProductController };