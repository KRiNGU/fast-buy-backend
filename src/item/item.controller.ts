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
    return await this.itemService.getItem(id);
  }

  @Post()
  async createItem(@Body() item: CreateItemDto) {
    return await this.itemService.createItem(item);
  }

  @Put(':id')
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateItemDto,
  ) {
    return await this.itemService.updateItem(id, dto);
  }

  @Delete(':id')
  async deleteItem(@Param('id', ParseIntPipe) id: number) {
    return await this.itemService.deleteItem(id);
  }
}
