import { PrismaExceptionFilter } from '@filters/prisma-exception.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@UseFilters(new PrismaExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get(':id')
  async getAuth(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.getAuth(id);
  }

  @Post()
  async createAuth(@Body() dto: CreateAuthDto) {
    return await this.authService.createAuth(dto);
  }

  @Put(':id')
  async updateAuth(
    @Body() dto: UpdateAuthDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(dto);
    return await this.authService.updateAuth(id, dto);
  }

  @Delete(':id')
  async deleteAuth(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.deleteAuth(id);
  }
}
