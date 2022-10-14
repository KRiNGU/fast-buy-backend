import { Token } from '@prisma/client';
import { mockAuth, mockSignInDto, mockSignUpDto } from '@/auth/mock/auth.mock';
import { TokenService } from '@/token/token.service';
import { PrismaService } from '@/prisma.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getMockToken } from '@/token/mock/token.mock';
import { Tokens } from './models';
import * as utils from '@/utils/utils';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let tokenService: TokenService;
  let jwtService: JwtService;
  const prismaService: PrismaService = new PrismaService();
  const tokensObj = { accessToken: 'access', refreshToken: 'refresh' };
  const mockToken: Token = getMockToken(tokensObj.refreshToken);

  beforeEach(() => {
    tokenService = new TokenService(jwtService, prismaService);
    service = new AuthService(prismaService, tokenService);
    tokenService.getTokens = jest.fn().mockReturnValue(tokensObj);
  });

  describe('signup', () => {
    const mockHashedPassword = 'password hash';

    beforeEach(() => {
      prismaService.auth.create = jest.fn().mockReturnValue(mockAuth);
      tokenService.createToken = jest.fn().mockReturnValue(mockToken);
      jest
        .spyOn(utils, 'hashData')
        .mockImplementation(async () => mockHashedPassword);
    });

    describe('when signup is called', () => {
      let tokens: Tokens;
      beforeEach(async () => {
        tokens = await service.signUp(mockSignUpDto);
      });

      test('then it would call prismaService.auth create method', async () => {
        expect(prismaService.auth.create).toBeCalledWith({
          data: {
            ...mockSignUpDto.auth,
            password: mockHashedPassword,
            user: { create: mockSignUpDto.user },
          },
        });
      });

      test('then it would call tokenService getTokens method', () => {
        expect(tokenService.getTokens).toBeCalledWith(
          mockAuth.id,
          mockAuth.email,
          mockAuth.login,
        );
      });

      test('then it would call tokenService createToken method', () => {
        expect(tokenService.createToken).toBeCalledWith(
          mockAuth.id,
          tokensObj.refreshToken,
        );
      });

      test('then it would return value', () => {
        expect(tokens).toEqual(tokensObj);
      });
    });
  });

  describe('signin', () => {
    beforeEach(() => {
      prismaService.auth.findUniqueOrThrow = jest
        .fn()
        .mockReturnValue(mockAuth);
      tokenService.updateToken = jest.fn();
      tokenService.createToken = jest.fn();
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    });

    describe('if we call signin', () => {
      let tokens: Tokens;
      beforeEach(async () => {
        tokens = await service.signIn(mockSignInDto);
      });

      test('then it would call prismaService.auth findUniqueOrThrow method', () => {
        expect(prismaService.auth.findUniqueOrThrow).toBeCalledWith({
          where: { email: mockSignInDto.email },
        });
      });

      test('then it would return value', () => {
        expect(tokens).toEqual(tokensObj);
      });
    });

    describe('if we call signin with refresh token in Authorization', () => {
      test('then it would call tokenService updateTokens method', async () => {
        const prevToken = 'prevToken';
        await service.signIn(mockSignInDto, prevToken);
        expect(tokenService.updateToken).toBeCalledWith(
          mockAuth.id,
          prevToken,
          tokensObj.refreshToken,
        );
      });
    });

    describe('if we call signin without refresh token in Authorization', () => {
      test('then it would call tokenService createTokens method', async () => {
        await service.signIn(mockSignInDto);
        expect(tokenService.createToken).toBeCalledWith(
          mockAuth.id,
          tokensObj.refreshToken,
        );
      });
    });
  });

  describe('logout', () => {
    test('we should call tokenService deleteToken method', async () => {
      tokenService.deleteToken = jest.fn();
      await service.logout(tokensObj.refreshToken);
      expect(tokenService.deleteToken).toBeCalledWith(tokensObj.refreshToken);
    });
  });

  describe('logout all', () => {
    test('we should call tokenService clear method', async () => {
      tokenService.clear = jest.fn();
      await service.logoutAll(mockAuth.id);
      expect(tokenService.clear).toBeCalledWith(mockAuth.id);
    });
  });

  describe('refresh token', () => {
    const mockHashedToken = 'refresh hash';
    beforeEach(() => {
      jest.spyOn(utils, 'hashDataEq').mockReturnValue(mockHashedToken);
      prismaService.auth.findUniqueOrThrow = jest
        .fn()
        .mockReturnValue(mockAuth);
      prismaService.token.findUniqueOrThrow = jest
        .fn()
        .mockReturnValue(mockToken);
      tokenService.updateToken = jest.fn();
    });

    describe('when refreshToken is called', () => {
      let tokens: Tokens;
      const refreshableToken = 'refreshable';
      beforeEach(async () => {
        tokens = await service.refreshToken(mockAuth.id, refreshableToken);
      });

      test('then it would call prismaService.auth findUniqueOrThrow method', () => {
        expect(prismaService.auth.findUniqueOrThrow).toBeCalledWith({
          where: { id: mockAuth.id },
        });
      });

      test('then it would call prismaService.token findUniqueOrThrow method', () => {
        expect(prismaService.token.findUniqueOrThrow).toBeCalledWith({
          where: { token: mockHashedToken },
        });
      });

      test('then it would call tokenService getTokens method', () => {
        expect(tokenService.getTokens).toBeCalledWith(
          mockAuth.id,
          mockAuth.email,
          mockAuth.login,
        );
      });

      test('then it would call tokenService updateToken method', () => {
        expect(tokenService.updateToken).toBeCalledWith(
          mockAuth.id,
          refreshableToken,
          tokensObj.refreshToken,
        );
      });

      test('then it would return value', () => {
        expect(tokens).toEqual(tokensObj);
      });
    });
  });
});
