import { JwtPayload, Tokens } from '@/auth/models';
import { PrismaService } from '@/prisma.service';
import { hashDataEq } from '@/utils/utils';
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
    const hashedToken = hashDataEq(refreshToken);
    const dateNow = Date.now();
    const expiresAt = this.getExpiresDateRefreshToken(dateNow);
    await this.clearExpiredTokens(authId);
    return await this.prismaService.token.create({
      data: { authId, token: hashedToken, expiresAt: expiresAt },
    });
  }

  async updateToken(
    authId: number,
    prevToken: string,
    refreshToken: string,
  ): Promise<Token> {
    const hashedPrevToken = hashDataEq(prevToken);
    const expiresAt = this.getExpiresDateRefreshToken(Date.now());
    const hashedToken = hashDataEq(refreshToken);
    await this.clearExpiredTokens(authId);
    return await this.prismaService.token.update({
      where: { token: hashedPrevToken },
      data: { token: hashedToken, expiresAt: expiresAt },
    });
  }

  async clearExpiredTokens(authId: number) {
    const tokens = await this.prismaService.token.findMany({
      where: { authId },
    });
    const deleteTokens = tokens
      .filter((token) => token.expiresAt <= BigInt(Date.now()))
      .map((token) => token.token);
    await this.prismaService.token.deleteMany({
      where: { token: { in: deleteTokens } },
    });
  }

  async clear(authId: number) {
    await this.prismaService.token.deleteMany({ where: { authId } });
  }

  async deleteToken(refreshToken: string): Promise<void> {
    const hashedToken = hashDataEq(refreshToken);
    await this.prismaService.token.delete({ where: { token: hashedToken } });
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

  getExpiresDateRefreshToken = (date: number): bigint =>
    BigInt(
      date + Number.parseInt(process.env.REFRESH_EXPIRES_IN_SECONDS) * 1000,
    );
}
