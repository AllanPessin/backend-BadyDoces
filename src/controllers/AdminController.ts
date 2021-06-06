import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AdminRepository } from '../repositories/AdminRespository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import adminView from '../views/adminView';

class AdminController {
  /**
   * Role to authenticate the admin by id
   */
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;
    const adminRepository = getCustomRepository(AdminRepository);
    const admin = await adminRepository.findOne({ email });

    if (!admin) {
      response.status(400).json({
        erro: 'User not found',
      });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return response.status(400).json({
        error: 'User not found',
      });
    }

    const token = jwt.sign(
      { id: admin.id }, process.env.SECRET, { expiresIn: '365d' }
    );

    return response.status(200).json({
      token,
      admin
    });
  }
  
  /**
   * Role responsible for creating user administrator
   */

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const adminRepository = getCustomRepository(AdminRepository);
    const adminAlreadyExists = await adminRepository.findOne({ email });

    if (adminAlreadyExists) {
      return response.status(400).json({
        error: 'Admin already exists',
      });
    }

    const admin = adminRepository.create({
      name, email, password
    });

    await adminRepository.save(admin);

    return response.status(200).json(admin);
  }

  /**
   * Role responsible for show user administrator
   */

  async show(request: Request, response: Response) {
    const adminRepository = getCustomRepository(AdminRepository);
    const admin = await adminRepository.find();

    return response.json(adminView.renderMany(admin));
  }
}

export { AdminController };
