import { Role } from '@prisma/client';

export class CreateAuthDto {
  login: string;
  email: string;
  password: string;
  role: Role;
}
