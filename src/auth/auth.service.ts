import { Injectable } from '@nestjs/common';
import { Auth, Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getAuth(
    authWhereUniqueInput: Prisma.AuthWhereUniqueInput,
  ): Promise<Auth | null> {
    return this.prisma.auth.findUnique({
      where: {
        id: authWhereUniqueInput?.id,
        email: authWhereUniqueInput?.email,
        login: authWhereUniqueInput?.login,
      },
    });
  }

  async createAuth(data: Prisma.AuthCreateInput): Promise<Auth> {
    return this.prisma.auth.create({ data });
  }

  async update(params: {
    where: Prisma.AuthWhereUniqueInput;
    data: Prisma.AuthUpdateInput;
  }): Promise<Auth> {
    return this.prisma.auth.update({ where: params.where, data: params.data });
  }

  async delete(
    authWhereUniqueInput: Prisma.AuthWhereUniqueInput,
  ): Promise<Auth> {
    return this.prisma.auth.delete({
      where: {
        id: authWhereUniqueInput?.id,
        email: authWhereUniqueInput?.email,
        login: authWhereUniqueInput?.login,
      },
    });
  }
}
