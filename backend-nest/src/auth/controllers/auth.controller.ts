import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import { Users } from '../../models/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

   @Post('register')
  async register(@Body() user: Users): Promise<{ access_token: string }> {
    const createdUser = await this.authService.createUser(user);
    const token = this.authService.generateJWT(createdUser);
    return token;
  }

  @Post('login')
  async login(@Body() user: Users): Promise<{ access_token: string } | { message: string }> {
    const result = await this.authService.login(user.username, user.password);

    if (result) {
      return result;
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  @UseGuards(JwtAuthGuard) 
  @Get()
  findAll(): Promise<Users[]> {
    return this.authService.findAll();
  }
}