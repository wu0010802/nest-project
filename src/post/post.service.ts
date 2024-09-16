import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepositoryService } from './post.repository.service';
import { NetworkError, TimeoutError, InternalError } from '../error';

@Injectable()
export class PostService {
  constructor(private readonly PostRepositoryService: PostRepositoryService) {}

  create(createPostDto: CreatePostDto) {
    return this.PostRepositoryService.create(createPostDto);
  }

  findAll() {
    return this.PostRepositoryService.findAll();
  }

  async findOne(id: number) {
    let attempts = 0;
    const maxRetries = 3;

    while (attempts < maxRetries) {
      try {
        const post = await this.PostRepositoryService.realFindOne(id);
        if (post === null) {
          throw new NotFoundException(`Post with id ${id} not found`);
        }
        return post;
      } catch (error) {
        if (error === NetworkError || error === TimeoutError) {
          attempts++;
          if (attempts >= maxRetries) {
            throw new NotFoundException(`Fail to fetch post after ${maxRetries} retries due to network problem`);
          }
        } else if (error === InternalError) {
          throw new BadRequestException('Internal server error occurred while fetching post');
        } else {
          throw error;
        }
      }
    }
  }

  update(id: number, UpdatePostDto: UpdatePostDto) {
    return this.PostRepositoryService.update(id, UpdatePostDto);
  }

  remove(id: number) {
    return this.PostRepositoryService.remove(id);
  }
}
