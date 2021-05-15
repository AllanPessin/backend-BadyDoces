import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AdminRepository } from '../repositories/AdminRespository';
import { SaleRepository } from '../repositories/SaleRepository';

class SaleController {
  /**
   * Method to create a sale
   */
  async create(request: Request, response: Response) {
    const { admin_id, id_sale, value, costumer, delivered } = request.body;

    const saleRepository = getCustomRepository(SaleRepository);
    const adminRepository = getCustomRepository(AdminRepository);

    const saleAlreadyExists = await saleRepository.findOne({ id_sale });
    const adminAlreadyExists = await adminRepository.findOne({ id: admin_id });

    if (saleAlreadyExists) {
      return response.status(400).json({
        error: 'Sale already in system',
      });
    } else if (!adminAlreadyExists) {
      return response.status(400).json({
        error: 'User not found',
      });
    }

    const sale = saleRepository.create({
      id_sale,
      value,
      costumer,
      delivered,
      admin_id: adminAlreadyExists.id
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

    return response.json(sales);
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
}

export { SaleController };

