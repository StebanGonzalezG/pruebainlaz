import { Injectable } from '@nestjs/common';
import { Posts } from './../models/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private readonly postsRepository: MongoRepository<Posts>,
      ) {}

    async findAll(): Promise<Posts[]> {
      return this.postsRepository.find({ order: { date: 'DESC' } });
    }

    async createPost(postData: Partial<Posts>): Promise<Posts> {
    postData.date = new Date().toISOString().substring(0, 10);
    const newPost = this.postsRepository.create(postData);
    return this.postsRepository.save(newPost);
    }
}
