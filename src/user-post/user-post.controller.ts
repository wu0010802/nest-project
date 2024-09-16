import { Controller, Get, Param } from '@nestjs/common';
import { UserPost } from './entities/user-post.entity';

/** q4 */
@Controller('')
export class UserPostController {
  @Get('users/:id/posts')
  async getUserPosts(@Param('id') id: string): Promise<UserPost> {
    return {
      id: 1,
      name: 'John Doe',
      email: 'example',
      posts: [],
    };
  }
}
