import { PrismaService } from '@/prisma.service';
import { shortenedName } from '@/utils/utils';
import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async getComment(id: number): Promise<Comment> {
    return await this.prismaService.comment.findUniqueOrThrow({
      where: { id: id },
    });
  }

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const commenter = await this.prismaService.user.findUniqueOrThrow({
      where: { id: dto.userId },
    });
    const commentersName = shortenedName(
      commenter.name,
      commenter.lastName,
      commenter.patronymic,
    );
    return await this.prismaService.comment.create({
      data: { ...dto, commentersName },
    });
  }

  async updateComment(id: number, dto: UpdateCommentDto): Promise<Comment> {
    return await this.prismaService.comment.update({
      where: { id: id },
      data: dto,
    });
  }

  async deleteComment(id: number): Promise<Comment> {
    return await this.prismaService.comment.delete({ where: { id: id } });
  }
}
