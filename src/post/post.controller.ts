
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
    create(@Body() CreatePostDto: CreatePostDto) {
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
    update(@Param('id') id: string, @Body() UpdatePostDto: UpdatePostDto) {
      return this.PostService.update(+id, UpdatePostDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.PostService.remove(+id);
    }
    
  }
  