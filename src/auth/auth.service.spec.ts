import NotFoundException from '@/exceptions/not-found.exception';
import { PrismaService } from '@/prisma.service';
import { Auth, Role } from '@prisma/client';
import { AuthService } from './auth.service';

const mockAuth: Auth = {
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

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = new PrismaService();
    service = new AuthService(prismaService);
  });

  describe('auth', () => {
    describe('auth with existing id', () => {
      beforeEach(() => {
        prismaService.auth.findUnique = jest.fn().mockReturnValue(mockAuth);
      });

      describe('when auth is called', () => {
        let auth: Auth;

        beforeEach(async () => {
          auth = await service.getAuth({ id: mockAuth.id });
        });

        test('then it should call prismaService', () => {
          expect(prismaService.auth.findUnique).toBeCalledWith({
            where: {
              id: mockAuth.id,
            },
          });
        });

        test('then it should return a auth', () => {
          expect(auth).toEqual(mockAuth);
        });
      });
    });

    describe('auth with non existing id', () => {
      beforeEach(async () => {
        jest
          .spyOn(prismaService.auth, 'findUnique')
          .mockRejectedValue(new NotFoundException('Auth', 'id', mockAuth.id));
      });
      describe('when auth is called', () => {
        let auth: Auth;

        test('then it should call prismaService', async () => {
          try {
            auth = await service.getAuth({ id: mockAuth.id });
            expect(auth).toBeFalsy();
          } catch (err) {
            expect(prismaService.auth.findUnique).toBeCalledWith({
              where: { id: mockAuth.id },
            });
          }
        });

        test('then it should throw an NotFoundException', () => {
          expect(service.getAuth({ id: mockAuth.id })).rejects.toThrowError(
            NotFoundException,
          );
        });
      });
    });
  });
});
