import { Role } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: Role;
}
