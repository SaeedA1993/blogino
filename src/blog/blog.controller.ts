import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Post as BlogPost } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<BlogPost> {
    return this.blogService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<BlogPost[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPost> {
    const post = await this.blogService.findOne(+id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<BlogPost> {
    return this.blogService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(+id);
  }
}
