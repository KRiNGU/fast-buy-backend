import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(id: number): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id: id },
    });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({ data: dto });
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id: id },
      data: dto,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return await this.prismaService.user.delete({ where: { id: id } });
  }
}
