import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './constants';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { Users } from 'src/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../auth/services/user.service';
import { PostsService } from 'src/services/posts.service';
import { PostsController } from 'src/controller/posts.controller';
import { Posts } from 'src/models/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Posts]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService, PostsService],
  controllers: [AuthController,PostsController],
})
export class AuthModule {}