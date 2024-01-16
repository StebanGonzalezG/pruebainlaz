// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findById(id: number): Promise<Users | null> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      return user || null;
    } catch (error) {
      console.error('Error al buscar usuario por ID:', error);
      return null;
    }
  }
  
  
}
