import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async signUp(dto: SignUpDto) {
    const hashedPassword = await this.hashData(dto.auth.password);
    return this.prismaService.auth.create({
      data: {
        ...dto.auth,
        password: hashedPassword,
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
