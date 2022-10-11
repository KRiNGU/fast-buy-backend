import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';

export class SignUpDto {
  @ValidateNested()
  @Type(() => CreateAuthDto)
  auth: CreateAuthDto;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
