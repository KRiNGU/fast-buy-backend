import { Auth, Role } from '@prisma/client';

export const mockAuth: Auth = {
  id: 123,
  login: 'user',
  email: 'user@example.com',
  password: 'password',
  createdAt: new Date(Date.now()),
  role: Role.BUYER,
  isBanned: false,
  banReason: null,
  refreshList: [],
};
