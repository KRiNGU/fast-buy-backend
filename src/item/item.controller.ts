import { PrismaExceptionFilter } from '@filters/prisma-exception.filter';
import {
  Controller,
  ParseIntPipe,
  UseFilters,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@UseFilters(new PrismaExceptionFilter())
@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get(':id')
  async getItem(@Param('id', ParseIntPipe) id: number) {
    return null;
  }

  @Post()
  async createItem(@Body() item: CreateItemDto) {
    return null;
  }

  @Put(':id')
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateItemDto,
  ) {
    return null;
  }

  @Delete(':id')
  async deleteItem(@Param('id', ParseIntPipe) id: number) {
    return null;
  }
}
