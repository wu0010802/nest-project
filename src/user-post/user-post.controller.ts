import { Controller, Get, Param,NotFoundException } from '@nestjs/common';
import { UserPost } from './entities/user-post.entity';
import { UserPostService } from './user-post.service';


/** q4 */

@Controller('users')
export class UserPostController {
  constructor(private readonly userPostService: UserPostService) {}

  @Get(':id/posts')
  async findUserPosts(@Param('id') id: string) {
    const posts = await this.userPostService.findPostsByUserId(+id);
    return posts;
  }
}

