import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { Tokens } from './models';
import { TokenService } from '@/token/token.service';
import { hashData, hashDataEq } from '@/utils/utils';
import { SignInDto } from './dto/signin.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private tokenService: TokenService,
  ) {}

  async signUp(dto: SignUpDto): Promise<Tokens> {
    const hashedPassword = await hashData(dto.auth.password);
    const newAuth = await this.prismaService.auth.create({
      data: {
        ...dto.auth,
        password: hashedPassword,
        user: {
          create: dto.user,
        },
      },
    });
    const tokens = await this.tokenService.getTokens(
      newAuth.id,
      newAuth.email,
      newAuth.login,
    );
    await this.tokenService.createToken(newAuth.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(dto: SignInDto, updatableToken?: string): Promise<Tokens> {
    const auth = await this.prismaService.auth.findUniqueOrThrow({
      where: { email: dto.email },
    });
    const passwordMatches = await compare(dto.password, auth.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.tokenService.getTokens(
      auth.id,
      auth.email,
      auth.login,
    );
    if (updatableToken) {
      await this.tokenService.updateToken(
        auth.id,
        updatableToken,
        tokens.refreshToken,
      );
    } else {
      await this.tokenService.createToken(auth.id, tokens.refreshToken);
    }
    return tokens;
  }

  async logout(refreshToken: string) {
    this.tokenService.deleteToken(refreshToken);
  }

  async logoutAll(authId: number) {
    this.tokenService.clear(authId);
  }

  async refreshToken(
    authId: number,
    refreshableToken: string,
  ): Promise<Tokens> {
    const hashedToken = hashDataEq(refreshableToken);
    const auth = await this.prismaService.auth.findUniqueOrThrow({
      where: { id: authId },
    });
    await this.prismaService.token.findUniqueOrThrow({
      where: { token: hashedToken },
    });

    const tokens = await this.tokenService.getTokens(
      auth.id,
      auth.email,
      auth.login,
    );

    await this.tokenService.updateToken(
      auth.id,
      refreshableToken,
      tokens.refreshToken,
    );

    return tokens;
  }
}
