import { User } from '@prisma/client';
import { mockUser } from './mock/user.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    service = new UserService(null);
    controller = new UserController(service);
  });

  describe('getUser', () => {
    beforeEach(() => {
      service.getUser = jest.fn().mockReturnValue(mockUser);
    });

    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.getUser(mockUser.id);
      });

      test('then it should call userService getUser method', () => {
        expect(service.getUser).toBeCalledWith(mockUser.id);
      });

      test('then it should return value', () => {
        expect(user).toEqual(mockUser);
      });
    });
  });

  describe('deleteUser', () => {
    beforeEach(() => {
      service.deleteUser = jest.fn().mockReturnValue(mockUser);
    });

    describe('when deleteUser is called', () => {
      let auth: User;

      beforeEach(async () => {
        auth = await controller.deleteUser(mockUser.id);
      });

      test('then it should call userService deleteUser method', () => {
        expect(service.deleteUser).toBeCalledWith(mockUser.id);
      });

      test('then it should return value', () => {
        expect(auth).toEqual(mockUser);
      });
    });
  });

  describe('createUser', () => {
    beforeEach(() => {
      service.createUser = jest.fn().mockReturnValue(mockUser);
    });

    describe('when createUser is called', () => {
      let auth: User;

      beforeEach(async () => {
        auth = await controller.createUser({
          name: mockUser.name,
          lastName: mockUser.lastName,
          patronymic: mockUser.patronymic,
          role: mockUser.role,
        });
      });

      test('then it should call userService createUser method', () => {
        expect(service.createUser).toBeCalledWith({
          name: mockUser.name,
          lastName: mockUser.lastName,
          patronymic: mockUser.patronymic,
          role: mockUser.role,
        });
      });

      test('then it should return value', () => {
        expect(auth).toEqual(mockUser);
      });
    });
  });

  describe('updateUser', () => {
    const updatedUser = { ...mockUser, lastName: 'Baren' };

    beforeEach(() => {
      service.updateUser = jest.fn().mockReturnValue(updatedUser);
    });

    describe('when updateUser is called', () => {
      let auth: User;

      beforeEach(async () => {
        auth = await controller.updateUser(mockUser.id, updatedUser);
      });

      test('then it should call userService updateUser method', () => {
        expect(service.updateUser).toBeCalledWith(mockUser.id, updatedUser);
      });

      test('then it should return value', () => {
        expect(auth).toEqual(updatedUser);
      });
    });
  });
});
