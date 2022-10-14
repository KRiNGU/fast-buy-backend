import { SignInDto } from './../dto/signin.dto';
import { Auth } from '@prisma/client';
import { SignUpDto } from '../dto/signup.dto';

export const mockAuth: Auth = {
  id: 123,
  login: 'user',
  email: 'user@example.com',
  password: 'password',
  createdAt: new Date(Date.now()),
  isBanned: false,
  banReason: null,
  userId: 1,
};

export const mockSignUpDto: SignUpDto = {
  auth: {
    login: 'user',
    email: 'user@example.com',
    password: 'password',
  },
  user: {
    name: 'Alexandr',
    lastName: 'Lobashov',
    role: 'ADMIN',
  },
};

export const mockSignInDto: SignInDto = {
  email: 'user@example.com',
  password: 'password',
};
