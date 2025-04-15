import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(newPost);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: number): Promise<Post | null> {
    return this.postsRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update(id, updatePostDto);
    const updatedPost = await this.findOne(id);
    if (!updatedPost) {
      throw new Error(`Post with ID ${id} not found after update`);
    }
    return updatedPost;
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
