import { Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repositories/CategoryRepository";
import categoryView from "../views/categoryView";

class CategoryController {
  async create(request: Request, response: Response) {
    const category_name = request.body;
    const categoryRepository = getCustomRepository(CategoryRepository);
    const categoryExists = await categoryRepository.findOne(category_name);

    if (categoryExists) {
      return response.status(200).json({
        error: "Categoryalready exists"
      })
    }

    const category = categoryRepository.create(category_name);

    await categoryRepository.save(category);

    return response.json(category);
  }

  async show(request: Request, response: Response) {
    const categoryRepository = getCustomRepository(CategoryRepository);
    const category = await categoryRepository.find();
    return response.json(categoryView.renderMany(category));
  }

  async update(request: Request, response: Response) {
    const categoryRepository = getCustomRepository(CategoryRepository);
    const category = await categoryRepository.findOne(request.params.id);

    if (category) {
      getCustomRepository(CategoryRepository).merge(category, request.body);
      const result = await getCustomRepository(CategoryRepository).save(category);
      return response.json(categoryView.render(result));
    }

    return response.status(400).json({
      error: "Category doesn't exists"
    })
  }

  async delete(request: Request, response: Response) {
    const categoryRepository = getCustomRepository(CategoryRepository);
    const category = await categoryRepository.findOne(request.params.id);

    if (category) {
      const result = await getCustomRepository(CategoryRepository).delete(category);
      return response.json([
        result,
        {
          message: "The category was excluded",
          category: categoryView.render(category)
        },
      ]);
    }

    return response.status(400).json({
      error: "Cannot delete category"
    });
  }
}

export { CategoryController };
