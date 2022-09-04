import { Injectable } from '@nestjs/common';
import { Auth } from '@prisma/client';
import { PrismaService } from '@/prisma.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getAuth(id: number): Promise<Auth | null> {
    return await this.prisma.auth.findUniqueOrThrow({ where: { id: id } });
  }

  async createAuth(dto: CreateAuthDto): Promise<Auth> {
    return await this.prisma.auth.create({ data: dto });
  }

  async updateAuth(id: number, data: UpdateAuthDto): Promise<Auth> {
    return await this.prisma.auth.update({
      where: { id },
      data: data,
    });
  }

  async deleteAuth(id: number): Promise<Auth> {
    return await this.prisma.auth.delete({
      where: {
        id,
      },
    });
  }
}
