import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}

  async getItem(id: number): Promise<Item> {
    return null;
  }

  async createItem(dto: CreateItemDto): Promise<Item> {
    return null;
  }

  async updateItem(id: number, dto: UpdateItemDto): Promise<Item> {
    return null;
  }

  async deleteItem(id: number): Promise<Item> {
    return null;
  }
}
