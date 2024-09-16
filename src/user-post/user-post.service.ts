import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRepositoryService } from '../user/user.repository.service';
import { PostRepositoryService } from '../post/post.repository.service';
import { NetworkError, TimeoutError, InternalError } from '../error';

@Injectable()
export class UserPostService {
    constructor(
        private readonly userRepositoryService: UserRepositoryService,
        private readonly postRepositoryService: PostRepositoryService,
    ) { }

    async findPostsByUserId(userId: number) {
        let attempts = 0;
        const maxRetries = 3;


        while (attempts < maxRetries) {
            try {
                const user = await this.userRepositoryService.findOne(userId);
                if (!user) {
                    throw new NotFoundException(`User with id ${userId} not found`);
                }


                const allPosts = await this.postRepositoryService.findAll();
                const userPosts = allPosts.filter(post => post.authorId === userId);


                if (userPosts.length === 0) {
                    throw new NotFoundException(`No posts found for user with id ${userId}`);
                }


                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    posts: userPosts,
                };

            } catch (error) {
                if (error === NetworkError || error === TimeoutError) {
                    attempts++;
                    if (attempts >= maxRetries) {
                        throw new NotFoundException(`Failed to fetch posts for user after ${maxRetries} retries due to network issues`);
                    }
                } else if (error === InternalError) {
                    throw new BadRequestException('Internal server error occurred while fetching user or posts');
                } else {
                    throw error;
                }
            }
        }
    }
}
