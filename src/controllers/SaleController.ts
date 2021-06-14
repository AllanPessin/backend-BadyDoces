import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AdminRepository } from '../repositories/AdminRespository';
import { ProductRepository } from '../repositories/ProductRepository';
import { SaleRepository } from '../repositories/SaleRepository';
import saleView from '../views/saleView';

interface SaleProps {
  id_sale: string;
  admin_id: string;
  value: string;
  costumer: string;
  id_product: Product[]
  amount: number
}

type Product = {
  id_product: string;
  amount: number;
  price: number
}

class SaleController {
  /**
   * Method to create a sale
   */
  async create(request: Request, response: Response) {
    const { admin_id, costumer, id_product } = request.body as SaleProps

    const [saleRepository, adminRepository, productRepository, /**saleProductRepository*/] = await Promise.all([
      getCustomRepository(SaleRepository),
      getCustomRepository(AdminRepository),
      getCustomRepository(ProductRepository),
      // getCustomRepository(SaleProductRepository)
    ])

    const adminAlreadyExists = await adminRepository.findOne({ id: admin_id });
    let value = 0

    try {
      for (const p of id_product) {
        const product = await productRepository.findOne(p.id_product) as Product
        value += parseFloat(p.price.toString())

        for(const p2 of id_product) {
          if (!product) {
            throw new Error("Product doesn't exists");
  
          } else if (p2.amount > product.amount) {
            throw new Error("Amount greater than stock");
          } 
        }
        product.amount = product.amount - p.amount
        productRepository.save({ ...product });        
      }

      if (!adminAlreadyExists) {
        return response.status(400).json({
          error: 'User not found',
        });
      }

      const sale = saleRepository.create({
        value,
        costumer,
        admin_id: adminAlreadyExists.id,
      });

     

      await saleRepository.save(sale);

      // for (const p3 of id_product) {
      //   const saleProduct = saleProductRepository.create({
      //     sale_id: sale.id_sale,
      //     product_id: p3.id_product,
      //     value: p3.amount * p3.price
      //   });
      //   await saleProductRepository.save(saleProduct)
      // }

      return response.status(200).json(sale);

    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  /**
   * Method to show all the sales
   */

  async show(request: Request, response: Response) {
    const salesRepository = getCustomRepository(SaleRepository);
    const sales = await salesRepository.find();

    return response.json(saleView.renderMany(sales));
  }

  async showSaleByTime(requst: Request, response: Response) {
    const saleRepository = getCustomRepository(SaleRepository);
    const sales = await saleRepository.find({
      order: {
        created_at: "DESC",
      }
    })

    return response.status(200).json(sales);
  }

  /**
   * Method to delete a sale 
   */

  async delete(request: Request, response: Response) {
    const saleRepository = await getCustomRepository(SaleRepository)
    const sale = await saleRepository.findOne(request.params.id);

    if (sale) {
      const result = await getCustomRepository(SaleRepository).delete(sale.id_sale);
      return response.json(result);
    }
    return response.status(200).json({
      error: "Sale not found"
    });
  }

  /**
   * Method to set sale delivered
   */

  async setDelivered(request: Request, response: Response) {

    const saleRepository = await getCustomRepository(SaleRepository);
    const sale = await saleRepository.findOne(request.params.id);

    if (sale) {
      sale.delivered = true;
      const result = await getCustomRepository(SaleRepository).save(sale);
      return response.json(result);
    }
  }

  /**
   * Method to count the sales delivered
   */

  async countDeliverdeSales(request: Request, response: Response) {
    const saleRepository = await getCustomRepository(SaleRepository);
    const sale = await saleRepository.findAndCount({
      delivered: true
    });

    if (sale[1] == 0 || sale[0] == null) {
      return response.status(200).json({
        error: "There is no sale delivered"
      });
    }
    return response.json(sale);
  }
  async showSaleByCostumer(request: Request, response: Response) {
    const saleRepository = await getCustomRepository(SaleRepository);
    const sales = await saleRepository.find({
      where: {
        costumer: request.params.costumer
      }
    })
    if (!sales) {
      return response.status(400).json({
        error: "Costumer deost'n exists"
      })
    }

    return response.status(200).json(saleView.renderMany(sales))
  }
}

export { SaleController };

