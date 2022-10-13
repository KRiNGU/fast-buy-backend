import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { Tokens } from './models';
import { TokenService } from '@/token/token.service';
import { hashData } from '@/utils/utils';
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
      await this.tokenService.updateTokens(updatableToken, tokens.refreshToken);
    } else {
      await this.tokenService.createToken(auth.id, tokens.refreshToken);
    }
    return tokens;
  }

  async logout() {
    return null;
  }

  async refreshToken(oldRefreshToken: string) {
    console.log(oldRefreshToken);
    return null;
  }
}
