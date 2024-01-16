// auth.service.ts
import { JwtService } from '@nestjs/jwt';
import { Users } from '../../models/user.entity';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadToken } from '../models/payload.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users) private userModel: MongoRepository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userModel.find();
  }

  async createUser(user: Users): Promise<Users> {
    return this.userModel.save(user);
  }

  async login(username: string, password: string): Promise<{ access_token: string, username:string } | null> {
    const user = await this.userModel.findOne({ where: { username, password } });

    if (user) {
      const payload: PayloadToken = { sub: user.id, role: '' };
      return {
        access_token: this.jwtService.sign(payload),
        username: user.username, 
      };
    }

    return null;
  }

  async validateUser(username: string, password: string): Promise<Users | null> {
    return this.userModel.findOne({ where: { username, password } });
  }

  generateJWT(user: Users): { access_token: string } {
    const payload: PayloadToken = {
      sub: user.id,
      role: ''
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
