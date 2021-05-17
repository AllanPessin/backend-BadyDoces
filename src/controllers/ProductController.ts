import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import productView from "../views/productView";

class ProductController {
  async create(request: Request, response: Response) {
    const { name, price, name_category, amount } = request.body;

    const productReposiory = getCustomRepository(ProductRepository);
    const categoryReposiory = getCustomRepository(CategoryRepository);

    const categoryExists = await categoryReposiory.findOne({ category_name: name_category });


    if (!categoryExists) {
      return response.status(400).json({
        error: "Category doesn't exists"
      })
    }

    const product = productReposiory.create({
      name,
      price,
      amount,
      name_category: categoryExists.category_name
    });

    await productReposiory.save(product);

    return response.json(productView.render(product))

  }

  async show(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.find();

    return response.json(productView.renderMany(product));
  }

  async update(request: Request, response: Response) {
    const productReposiory = getCustomRepository(ProductRepository);
    const product = await productReposiory.findOne(request.params.id);

    if (product) {
      getCustomRepository(ProductRepository).merge(product, request.body);
      const result = await getCustomRepository(ProductRepository).save(product);
      return response.json(productView.render(result));
    }
  }

  async index(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(request.params.id);

    return response.json(productView.render(product));
  }

  async delete(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(request.params.id);

    if (product) {
      const result = await getCustomRepository(ProductRepository).delete(product);
      return response.json(result);
    }
  }

  async showProductByCategory(request: Request, response: Response) {
    const productReposiory = getCustomRepository(ProductRepository);
    const products = await productReposiory.find({
      where: {
        name_category: request.params.name_category
      }
    });

    if (products[0] == null) {
      return response.status(400).json({
        error: "Category not found"
      })
    }
    
    return response.json(productView.renderMany(products));
  }
}

export { ProductController };
