import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(id: number): Promise<User> {
    return;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return;
  }

  async updateUser(dto: UpdateUserDto): Promise<User> {
    return;
  }

  async deleteUser(id: number): Promise<User> {
    return;
  }
}
