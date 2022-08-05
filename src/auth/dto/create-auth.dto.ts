import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  userId: number;
}
