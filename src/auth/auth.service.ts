import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signUp(dto: SignUpDto) {
    return this.prismaService.auth.create({
      data: {
        ...dto.auth,
        user: {
          create: dto.user,
        },
      },
    });
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
