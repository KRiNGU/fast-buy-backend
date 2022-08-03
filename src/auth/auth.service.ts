import { Injectable } from '@nestjs/common';
import { Auth, Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getAuth(
    authWhereUniqueInput: Prisma.AuthWhereUniqueInput,
  ): Promise<Auth | null> {
    return;
  }

  async createAuth(data: Prisma.AuthCreateInput): Promise<Auth> {
    return;
  }

  async update(params: {
    where: Prisma.AuthWhereUniqueInput;
    data: Prisma.AuthUpdateInput;
  }): Promise<Auth> {
    return;
  }

  async delete({ where: authWhereUniqueInput }): Promise<Auth> {
    return;
  }
}
