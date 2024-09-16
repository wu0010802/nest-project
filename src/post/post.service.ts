// Please not modify this file

import { Injectable } from '@nestjs/common';

import { PostRepositoryService as PostRepositoryService } from './post.repository.service';

@Injectable()
export class PostService {
  constructor(private readonly PostRepositoryService: PostRepositoryService) {}

  create(createPostDto: {
    title: string;
    content: string;
    authorId: number;
  }) {
    return this.PostRepositoryService.create(createPostDto);
  }

  findAll() {
    return this.PostRepositoryService.findAll();
  }

  findOne(id: number) {
    return this.PostRepositoryService.findOne(id);
  }

  update(id: number, UpdatePostDto: {
    title?: string;
    content?: string;
    authorId?: number;
  }) {
    return this.PostRepositoryService.update(id, UpdatePostDto);
  }

  remove(id: number) {
    return this.PostRepositoryService.remove(id);
  }
}
