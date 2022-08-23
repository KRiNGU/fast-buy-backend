import { Role, User } from '@prisma/client';

export const mockUser: User = {
  id: 1,
  name: 'John',
  lastName: 'Smith',
  patronymic: 'Peterson',
  role: Role.BUYER,
  createdAt: new Date(Date.now()),
};
