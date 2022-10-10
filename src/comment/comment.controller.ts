import { PrismaExceptionFilter } from '@filters/prisma-exception.filter';
import {
  Controller,
  UseFilters,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@UseFilters(new PrismaExceptionFilter())
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  async getComment(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.getComment(id);
  }

  @Post()
  async createComment(@Body() comment: CreateCommentDto) {
    return await this.commentService.createComment(comment);
  }

  @Put(':id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() comment: UpdateCommentDto,
  ) {
    return await this.commentService.updateComment(id, comment);
  }

  @Delete(':id')
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.deleteComment(id);
  }
}
