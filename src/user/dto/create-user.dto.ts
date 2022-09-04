import { Role } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  patronymic: string;

  @IsEnum(Role)
  role: Role;
}
