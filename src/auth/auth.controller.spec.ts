import { mockSignUpDto, mockSignInDto } from '@/auth/mock/auth.mock';
import { getMockToken } from '@/token/mock/token.mock';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Tokens } from './models';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  const tokensObj = { accessToken: 'access', refreshToken: 'refresh' };
  const mockToken = getMockToken(tokensObj.refreshToken);
  beforeEach(() => {
    authService = new AuthService(null, null);
    controller = new AuthController(authService);
  });

  describe('signup', () => {
    describe('when the signup is called', () => {
      let tokens: Tokens;
      beforeEach(async () => {
        authService.signUp = jest.fn().mockReturnValue(tokensObj);
        tokens = await controller.signUp(mockSignUpDto);
      });

      test('then it would call authService signUp method', () => {
        expect(authService.signUp).toBeCalledWith(mockSignUpDto);
      });

      test('then it would return value', () => {
        expect(tokens).toEqual(tokensObj);
      });
    });
  });

  describe('signin', () => {
    beforeEach(() => {
      authService.signIn = jest.fn().mockReturnValue(tokensObj);
    });
    describe('when the signin is called', () => {
      let tokens: Tokens;
      beforeEach(async () => {
        tokens = await controller.signIn(mockSignInDto);
      });

      test('then it would call authService signUp method', () => {
        expect(authService.signIn).toBeCalledWith(mockSignInDto);
      });

      test('then it would return value', () => {
        expect(tokens).toEqual(tokensObj);
      });
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      authService.logout = jest.fn();
    });
    describe('when the logout is called', () => {
      beforeEach(async () => {
        await controller.logout(tokensObj.refreshToken);
      });

      test('then it would call authService signUp method', () => {
        expect(authService.logout).toBeCalledWith(tokensObj.refreshToken);
      });
    });
  });

  describe('logout all', () => {
    beforeEach(() => {
      authService.logoutAll = jest.fn();
    });
    describe('when the logoutAll is called', () => {
      beforeEach(async () => {
        await controller.logoutAll(mockToken.authId);
      });

      test('then it would call authService signUp method', () => {
        expect(authService.logoutAll).toBeCalledWith(mockToken.authId);
      });
    });
  });

  describe('refresh token', () => {
    beforeEach(() => {
      authService.refreshToken = jest.fn().mockReturnValue(tokensObj);
    });
    describe('when the refreshToken is called', () => {
      let tokens: Tokens;
      beforeEach(async () => {
        tokens = await controller.refreshToken(
          mockToken.authId,
          tokensObj.refreshToken,
        );
      });

      test('then it would call authService refreshToken method', () => {
        expect(authService.refreshToken).toBeCalledWith(
          mockToken.authId,
          tokensObj.refreshToken,
        );
      });

      test('then it would return value', () => {
        expect(tokens).toEqual(tokensObj);
      });
    });
  });
});
