import { JwtPayload, Tokens } from '@/auth/models';
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
    const dateNow = Date.now();
    const expiresAt = this.getExpiresDateRefreshToken(dateNow);
    this.cleanExpiredTokens(authId, expiresAt);
    return await this.prismaService.token.create({
      data: { authId, token: hashedToken, expiresAt },
    });
  }

  async updateTokens(prevToken: string, refreshToken: string): Promise<Token> {
    const hashedPrevToken = await hashData(prevToken);
    const expiresAt = this.getExpiresDateRefreshToken(Date.now());
    const hashedToken = await hashData(refreshToken);
    return await this.prismaService.token.update({
      where: { token: hashedPrevToken },
      data: { token: hashedToken, expiresAt },
    });
  }

  async cleanExpiredTokens(authId: number, expiresAt: number) {
    const tokens = await this.prismaService.token.findMany({
      where: { authId },
    });
    const deleteTokens: string[] = tokens
      .filter((token) => token.expiresAt <= expiresAt)
      .map((token) => token.token);
    await this.prismaService.token.deleteMany({
      where: { token: { in: deleteTokens } },
    });
  }

  async getTokens(
    authId: number,
    email: string,
    login: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: authId,
      email,
      login,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_SECRET_KEY,
        expiresIn: process.env.ACCESS_EXPIRES_IN_SECONDS,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_SECRET_KEY,
        expiresIn: process.env.REFRESH_EXPIRES_IN_SECONDS,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private getExpiresDateRefreshToken = (date: number): number => {
    return (
      date + Number.parseInt(process.env.REFRESH_EXPIRES_IN_SECONDS) * 1000
    );
  };
}
