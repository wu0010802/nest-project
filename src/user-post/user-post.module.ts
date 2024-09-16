import { Module } from '@nestjs/common';
import { UserPostController } from './user-post.controller';
import { UserPostService } from './user-post.service';
import { UserRepositoryService } from '../user/user.repository.service';
import { PostRepositoryService } from '../post/post.repository.service'; 

@Module({
  controllers: [UserPostController],
  providers: [UserPostService, UserRepositoryService, PostRepositoryService],
})
export class UserPostModule {}
