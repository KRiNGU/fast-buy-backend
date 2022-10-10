import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}
}
