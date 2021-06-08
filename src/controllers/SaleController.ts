import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AdminRepository } from '../repositories/AdminRespository';
import { ProductRepository } from '../repositories/ProductRepository';
import { SaleRepository } from '../repositories/SaleRepository';
import saleView from '../views/saleView';

class SaleController {
  /**
   * Method to create a sale
   */
  async create(request: Request, response: Response) {
    const { admin_id, value, costumer, amount, id_product } = request.body

    const [saleRepository, adminRepository, productRepository] = await Promise.all([
       getCustomRepository(SaleRepository),
       getCustomRepository(AdminRepository),
       getCustomRepository(ProductRepository),
    ])

    // const saleAlreadyExists = await saleRepository.findOne( request.body.id_sale );
    const adminAlreadyExists = await adminRepository.findOne({ id: admin_id});
    const product = await productRepository.findOne(id_product)

    if (!adminAlreadyExists) {
      return response.status(400).json({
        error: 'User not found',
      });
    }
    
    if(!product) {
      return response.status(400).json({
        error: "Product doesn't exists"
      });
    } else if(amount > product.amount) {
      return response.status(400).json({
       error: "Amount greater than stock"
     });
    } else {
      product.amount = product.amount - amount  
      productRepository.save({...product});
    }

    const sale = saleRepository.create({
      value,
      costumer,
      admin_id: adminAlreadyExists.id, 
    });

    await saleRepository.save(sale);

    return response.status(200).json(sale);
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
