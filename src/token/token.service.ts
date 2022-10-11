import { Tokens } from '@/auth/models';
import { PrismaService } from '@/prisma.service';
import { hashData } from '@/utils/utils';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async createToken(authId: number, refreshToken: string): Promise<Token> {
    const hashedToken = await hashData(refreshToken);
    return await this.prismaService.token.create({
      data: { authId, token: hashedToken },
    });
  }

  async updateTokens(id: number, refreshToken: string) {
    const hashedToken = await hashData(refreshToken);
    await this.prismaService.token.update({
      where: { id: id },
      data: { token: hashedToken },
    });
  }

  async getTokens(
    authId: number,
    email: string,
    login: string,
  ): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: authId,
          email,
          login,
        },
        {
          secret: process.env.ACCESS_SECRET_KEY,
          expiresIn: 15 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: authId,
          email,
          login,
        },
        {
          secret: process.env.REFRESH_SECRET_KEY,
          expiresIn: 30 * 24 * 60 * 60,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
