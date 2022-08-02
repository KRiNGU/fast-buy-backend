import { Injectable } from '@nestjs/common';
import { Auth, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async auth(
    authWhereUniqueImput: Prisma.AuthWhereUniqueInput,
  ): Promise<Auth | null> {
    return;
  }

  async create(data: Prisma.AuthCreateInput): Promise<Auth> {
    return;
  }

  async update(params: {
    where: Prisma.AuthWhereUniqueInput;
    data: Prisma.AuthUpdateInput;
  }): Promise<Auth> {
    return;
  }

  async delete(id: number): Promise<Auth> {
    return;
  }
}
