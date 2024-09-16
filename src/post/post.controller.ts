// Please not modify this file
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { PostService } from './post.service';
  
  
  @Controller('posts')
  export class PostController {
    constructor(private readonly PostService: PostService) {}
  
    @Post()
    create(@Body() CreatePostDto: {
      title: string;
      content: string;
      authorId: number;
    }) {
      return this.PostService.create(CreatePostDto);
    }
  
    @Get()
    findAll() {
      return this.PostService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.PostService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdatePostDto: {
      title?: string;
      content?: string;
      authorId?: number;
    }) {
      return this.PostService.update(+id, UpdatePostDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.PostService.remove(+id);
    }
    
  }
  