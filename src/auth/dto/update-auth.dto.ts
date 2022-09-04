import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAuthDto {
  @IsString()
  @IsOptional()
  login: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  isBanned: boolean;

  @IsBoolean()
  @IsOptional()
  banReason: string;
}
