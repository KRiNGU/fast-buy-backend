import { PrismaService } from '@/prisma.service';
import { Auth } from '@prisma/client';
import { AuthService } from './auth.service';
import { mockAuth } from './mock/auth.mock';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = new PrismaService();
    service = new AuthService(prismaService);
  });

  describe('get auth', () => {
    beforeEach(() => {
      prismaService.auth.findUnique = jest.fn().mockReturnValue(mockAuth);
    });

    describe('when getAuth is called', () => {
      let auth: Auth;

      beforeEach(async () => {
        auth = await service.deleteAuth(mockAuth.id);
      });

      test('then it would call prismaService findUnique method', () => {
        expect(prismaService.auth.findUnique).toBeCalledWith({
          where: {
            id: mockAuth.id,
          },
        });
      });

      test('then it would return an atuh', () => {
        expect(auth).toEqual(mockAuth);
      });
    });
  });

  describe('create auth', () => {
    beforeEach(() => {
      prismaService.auth.create = jest.fn().mockReturnValue(mockAuth);
    });

    describe('when createAuth is called', () => {
      let auth: Auth;

      beforeEach(async () => {
        auth = await service.createAuth(mockAuth);
      });

      test('then it would call prismaService create method', () => {
        expect(prismaService.auth.create).toBeCalledWith({ data: mockAuth });
      });

      test('then it would return a created auth', () => {
        expect(auth).toEqual(mockAuth);
      });
    });
  });

  describe('edit auth', () => {
    const updateMockAuth = { ...mockAuth, login: 'newLogin' };

    beforeEach(() => {
      prismaService.auth.update = jest.fn().mockReturnValue(updateMockAuth);
    });

    describe('when updateAuth is called', () => {
      let auth: Auth;

      beforeEach(async () => {
        auth = await service.updateAuth(mockAuth.id, updateMockAuth);
      });

      test('then it would call prismaService update method', () => {
        expect(prismaService.auth.update).toBeCalledWith({
          where: { id: mockAuth.id },
          data: updateMockAuth,
        });
      });

      test('then it would return an updated auth', () => {
        expect(auth.login).toEqual(updateMockAuth.login);
      });
    });
  });

  describe('delete auth', () => {
    beforeEach(() => {
      prismaService.auth.delete = jest.fn().mockReturnValue(mockAuth);
    });

    describe('when deleteAuth is called', () => {
      let auth: Auth;

      beforeEach(async () => {
        auth = await service.deleteAuth(mockAuth.id);
      });

      test('then it would call prismaService delete method', () => {
        expect(prismaService.auth.delete).toBeCalledWith({
          where: { id: mockAuth.id },
        });
      });

      test('then it would return a deleted auth', () => {
        expect(auth).toEqual(mockAuth);
      });
    });
  });
});
