import { Auth } from '@prisma/client';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { mockAuth } from './mock/auth.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    service = new AuthService(null);
    controller = new AuthController(service);
  });

  describe('getAuth', () => {
    beforeEach(() => {
      service.getAuth = jest.fn().mockReturnValue(mockAuth);
    });

    describe('when getAuth is called', () => {
      let auth: Auth;

      beforeEach(async () => {
        auth = await controller.getAuth(mockAuth.id);
      });

      test('then it should call authService getAuth method', () => {
        expect(service.getAuth).toBeCalledWith(mockAuth.id);
      });

      test('then it should return value', () => {
        expect(auth).toEqual(mockAuth);
      });
    });
  });

  describe('deleteAuth', () => {
    beforeEach(() => {
      service.deleteAuth = jest.fn().mockReturnValue(mockAuth);
    });

    describe('when deleteAuth is called', () => {
      let auth: Auth;

      beforeEach(async () => {
        auth = await controller.deleteAuth(mockAuth.id);
      });

      test('then it should call authService deleteAuth method', () => {
        expect(service.deleteAuth).toBeCalledWith(mockAuth.id);
      });

      test('then it should return value', () => {
        expect(auth).toEqual(mockAuth);
      });
    });
  });

  describe('createAuth', () => {
    beforeEach(() => {
      service.createAuth = jest.fn().mockReturnValue(mockAuth);
    });

    describe('when createAuth is called', () => {
      let auth: Auth;

      beforeEach(async () => {
        auth = await controller.createAuth({
          login: mockAuth.login,
          password: mockAuth.password,
          email: mockAuth.email,
          userId: mockAuth.userId,
        });
      });

      test('then it should call authService createAuth method', () => {
        expect(service.createAuth).toBeCalledWith({
          login: mockAuth.login,
          password: mockAuth.password,
          email: mockAuth.email,
          userId: mockAuth.userId,
        });
      });

      test('then it should return value', () => {
        expect(auth).toEqual(mockAuth);
      });
    });
  });

  describe('updateAuth', () => {
    const updatedAuth = { ...mockAuth, login: 'newUser' };

    beforeEach(() => {
      service.updateAuth = jest.fn().mockReturnValue(updatedAuth);
    });

    describe('when updateAuth is called', () => {
      let auth: Auth;

      beforeEach(async () => {
        auth = await controller.updateAuth(mockAuth.id, updatedAuth);
      });

      test('then it should call authService updateAuth method', () => {
        expect(service.updateAuth).toBeCalledWith(mockAuth.id, updatedAuth);
      });

      test('then it should return value', () => {
        expect(auth).toEqual(updatedAuth);
      });
    });
  });
});
