import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { BlogService } from './blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
