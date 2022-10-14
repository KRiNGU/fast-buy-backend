import { PrismaService } from '@/prisma.service';
import { User } from '@prisma/client';
import { mockUser } from './mock/user.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const prismaService: PrismaService = new PrismaService();

  beforeEach(async () => {
    service = new UserService(prismaService);
  });

  describe('get user', () => {
    beforeEach(async () => {
      prismaService.user.findUniqueOrThrow = jest
        .fn()
        .mockReturnValue(mockUser);
    });

    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await service.getUser(mockUser.id);
      });

      test('then it would call prismaService findUniqueOrThrow method', () => {
        expect(prismaService.user.findUniqueOrThrow).toBeCalledWith({
          where: { id: mockUser.id },
        });
      });

      test('then it would return value', () => {
        expect(user).toEqual(mockUser);
      });
    });
  });

  describe('create user', () => {
    beforeEach(async () => {
      prismaService.user.create = jest.fn().mockReturnValue(mockUser);
    });

    describe('when createUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await service.createUser({
          name: mockUser.name,
          lastName: mockUser.lastName,
          patronymic: mockUser.patronymic,
          role: mockUser.role,
        });
      });

      test('then it would call prismaService create method', () => {
        expect(prismaService.user.create).toBeCalledWith({
          data: {
            name: mockUser.name,
            lastName: mockUser.lastName,
            patronymic: mockUser.patronymic,
            role: mockUser.role,
          },
        });
      });

      test('then it would return value', () => {
        expect(user).toEqual(mockUser);
      });
    });
  });

  describe('update user', () => {
    const updatedUser = { ...mockUser, name: 'Smith' };

    beforeEach(async () => {
      prismaService.user.update = jest.fn().mockReturnValue(updatedUser);
    });

    describe('when updateUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await service.updateUser(updatedUser.id, {
          name: updatedUser.name,
          lastName: updatedUser.lastName,
          patronymic: updatedUser.patronymic,
        });
      });

      test('then it would call prismaService update method', () => {
        expect(prismaService.user.update).toBeCalledWith({
          where: { id: updatedUser.id },
          data: {
            name: updatedUser.name,
            lastName: updatedUser.lastName,
            patronymic: updatedUser.patronymic,
          },
        });
      });

      test('then it would return value', () => {
        expect(user).toEqual(updatedUser);
      });
    });
  });

  describe('delete user', () => {
    beforeEach(async () => {
      prismaService.user.delete = jest.fn().mockReturnValue(mockUser);
    });

    describe('when deleteUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await service.deleteUser(mockUser.id);
      });

      test('then it would call prismaService delete method', () => {
        expect(prismaService.user.delete).toBeCalledWith({
          where: { id: mockUser.id },
        });
      });

      test('then it would return value', () => {
        expect(user).toEqual(mockUser);
      });
    });
  });
});
