import { Role } from '@prisma/client';

export class UpdateAuthDto {
  login: string;
  email: string;
  password: string;
  isBanned: boolean;
  banReason: string;
  refreshList: string[];
  role: Role;
}
