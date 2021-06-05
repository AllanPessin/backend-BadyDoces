import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repositories/ProductRepository";
import { SaleProductRepository } from "../repositories/SaleProductRepositrory";
import { SaleRepository } from "../repositories/SaleRepository";

class SaleProduct {
  async create(request: Request, response: Response) {
    const { id_product, id_sale } = request.body;

    const saleRepository = getCustomRepository(SaleRepository);
    const productRepository = getCustomRepository(ProductRepository);
    const saleProductRepository = getCustomRepository(SaleProductRepository);

    const sale = await saleRepository.findOne({ id_sale });
    
    if(!sale) {
      return response.status(400).json({
        error: "Sale does not exists"
      })
    }

    const product = await productRepository.findOne({ id_product })

    if(!product) {
      return response.status(400).json({
        error: "Product does not exists"
      })
    }

    const saleProductExists = await saleProductRepository.findOne({
      where: [{ sale_id: product.id_product }],
      relations: ["product", "sale"]
    })

    if(!saleProductExists) {
      const saleProduct = saleProductRepository.create({
        product_id: id_product,
        sale_id: id_sale,
        value: product.price,
        amount: product.amount
      })  
      await saleProductRepository.save(saleProduct)
    }    
    return response.status(400).json({
      error: "Product or sale does not exists"
    })
  }
  async show(request: Request, response: Response) {
    const saleProductRepository = getCustomRepository(SaleProductRepository);
    const saleProduct = await saleProductRepository.find();

    return response.status(200).json(saleProduct);
  }
}

//   async showByCostumer(request: Request, response: Response) {
//     const saleProductRepository = getCustomRepository(SaleProductRepository);
//     const saleProduct = await saleProductRepository.find({
//       where: {
//         costumer: request.params.costumer
//       }
//     });
//     return response.json(saleProduct);
//   }
// }

export { SaleProduct };
