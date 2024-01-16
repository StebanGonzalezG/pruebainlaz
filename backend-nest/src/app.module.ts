import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { Users } from './models/user.entity';
import { PostsService } from './services/posts.service';
import { PostsController } from './controller/posts.controller';
import { Posts } from './models/posts.entity';

@Module({
  imports: [AuthModule, ClientsModule,
    TypeOrmModule.forFeature([Posts]),
      TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'inlaze',
      autoLoadEntities: true,
      synchronize: true,
      entities: [join(__dirname, '**/**.entity(.ts,.js}')],
    }),],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
