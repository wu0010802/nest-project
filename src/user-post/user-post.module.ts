import { Module } from '@nestjs/common';
import { UserPostController } from './user-post.controller';

@Module({
  controllers: [UserPostController]
})
export class UserPostModule {}
