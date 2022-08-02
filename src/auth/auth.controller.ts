import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get(':id')
  async getAuth(@Param('id') id: number) {
    return await this.authService.getAuth({ id: id });
  }

  @Post()
  async createAuth(@Body() dto: CreateAuthDto) {
    return this.authService.create(dto);
  }

  @Put(':id')
  async updateAuth(@Body() dto: UpdateAuthDto, @Param('id') id: number) {
    return this.authService.update({ where: { id: id }, data: dto });
  }

  @Delete(':id')
  async deleteAuth(@Param('id') id: number) {
    return this.authService.delete(id);
  }
}
