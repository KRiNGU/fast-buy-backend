import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async getComment(id: number): Promise<Comment> {
    return null;
  }

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    return null;
  }

  async updateComment(id: number, dto: UpdateCommentDto): Promise<Comment> {
    return null;
  }

  async deleteComment(id: number): Promise<Comment> {
    return null;
  }
}
