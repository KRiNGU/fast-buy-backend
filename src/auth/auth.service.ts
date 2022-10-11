import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { Tokens } from './models';
import { TokenService } from '@/token/token.service';
import { hashData } from '@/utils/utils';

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
    this.tokenService.createToken(newAuth.id, tokens.refreshToken);
    return tokens;
  }

  async signIn() {
    return null;
  }

  async logout() {
    return null;
  }

  async refreshToken() {
    return null;
  }
}
