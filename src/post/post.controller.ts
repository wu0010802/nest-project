import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
  import { PostService } from './post.service';
  import { CreatePostDto } from './dto/create-post.dto';
  import { UpdatePostDto } from './dto/update-post.dto';
  
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
  
    @Put(':id')
    async update(@Param('id') id: Number, @Body() updatePostDto: UpdatePostDto) {
      const test_title = await this.PostService.update(+id, updatePostDto);
      console.log(test_title);
      return test_title;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.PostService.remove(+id);
    }
    
  }
  