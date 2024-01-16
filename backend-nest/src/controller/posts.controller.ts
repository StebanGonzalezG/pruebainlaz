import { PostsService } from 'src/services/posts.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Posts } from 'src/models/posts.entity';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Get()
    findAll(): Promise<Posts[]> {
    return this.postService.findAll();
    }

    @Get('search')
    searchPosts(@Query('message') searchTerm: string): Promise<Posts[]> {
        return this.postService.searchPosts(searchTerm);
    }
    
    @Post()
    createPost(@Body() postData: Partial<Posts>): Promise<Posts> {
    return this.postService.createPost(postData);
  }
}
