import { JwtPayload, Tokens } from '@/auth/models';
import { getMockToken } from './mock/token.mock';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma.service';
import { TokenService } from './token.service';
import { Token } from '@prisma/client';
import { hashDataEq } from '@/utils/utils';
import { mockAuth } from '@/auth/mock/auth.mock';

describe('TokenService', () => {
  let service: TokenService;
  const prismaService: PrismaService = new PrismaService();
  let jwtService: JwtService;
  const refreshToken = 'hashIt';
  const mockToken: Token = getMockToken(refreshToken);

  beforeEach(() => {
    jwtService = new JwtService();
    service = new TokenService(jwtService, prismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  describe('create token', () => {
    beforeEach(() => {
      prismaService.token.create = jest.fn().mockReturnValue(mockToken);
      service.getExpiresDateRefreshToken = jest
        .fn()
        .mockReturnValue(mockToken.expiresAt);
      service.clearExpiredTokens = jest.fn();
    });

    describe('when createToken is called', () => {
      let token: Token;

      beforeEach(async () => {
        token = await service.createToken(mockToken.authId, refreshToken);
      });

      test('then it would call crearExpiredTokens method once', () => {
        expect(service.clearExpiredTokens).toBeCalledTimes(1);
      });

      test('then it would call prismaService create method', () => {
        expect(prismaService.token.create).toBeCalledWith({
          data: {
            authId: mockToken.authId,
            expiresAt: mockToken.expiresAt,
            token: mockToken.token,
          },
        });
      });

      test('then it would return value', () => {
        expect(token).toEqual(mockToken);
      });
    });
  });

  describe('update tokens', () => {
    const newExpiresAt: bigint = mockToken.expiresAt + BigInt(1000);
    const newRefreshToken = 'newHash';
    const updatedToken: Token = {
      ...mockToken,
      expiresAt: newExpiresAt,
      token: hashDataEq(newRefreshToken),
    };

    beforeEach(() => {
      prismaService.token.update = jest.fn().mockReturnValue(updatedToken);
      service.getExpiresDateRefreshToken = jest
        .fn()
        .mockReturnValue(newExpiresAt);
      service.clearExpiredTokens = jest.fn();
    });

    describe('when updateTokens is called', () => {
      let token: Token;

      beforeEach(async () => {
        token = await service.updateToken(
          mockToken.authId,
          refreshToken,
          newRefreshToken,
        );
      });

      test('then it would call crearExpiredTokens method once', () => {
        expect(service.clearExpiredTokens).toBeCalledTimes(1);
      });

      test('then it would call prismaService update method', () => {
        expect(prismaService.token.update).toBeCalledWith({
          data: {
            expiresAt: updatedToken.expiresAt,
            token: updatedToken.token,
          },
          where: {
            token: mockToken.token,
          },
        });
      });

      test('then it would return value', () => {
        expect(token).toEqual(updatedToken);
      });
    });
  });

  describe('clear expired tokens', () => {
    const expiredToken = {
      ...mockToken,
      token: 'expired',
      expiresAt: mockToken.expiresAt - BigInt(10000),
    };
    const goodToken = {
      ...mockToken,
      token: 'good',
      expiresAt: mockToken.expiresAt + BigInt(10000),
    };
    const goodTokens: Token[] = [goodToken, goodToken];
    const expiredTokens: Token[] = [expiredToken, expiredToken, expiredToken];
    const tokens: Token[] = goodTokens.concat(expiredTokens);

    beforeEach(async () => {
      prismaService.token.findMany = jest.fn().mockReturnValue(tokens);
      prismaService.token.deleteMany = jest.fn();
    });

    describe('when clearExpiredTokens is called', () => {
      beforeEach(async () => {
        await service.clearExpiredTokens(mockToken.authId);
      });

      test('then it would call prismaService findMany method', () => {
        expect(prismaService.token.findMany).toBeCalledWith({
          where: { authId: mockToken.authId },
        });
      });

      test('then it would call prismaService deleteMany method', () => {
        expect(prismaService.token.deleteMany).toBeCalledWith({
          where: { token: { in: expiredTokens.map((token) => token.token) } },
        });
      });
    });
  });

  describe('clear', () => {
    beforeEach(() => {
      prismaService.token.deleteMany = jest.fn();
    });

    test('it would call the deleteMany method once', async () => {
      await service.clear(mockToken.authId);
      expect(prismaService.token.deleteMany).toBeCalledWith({
        where: { authId: mockToken.authId },
      });
    });
  });

  describe('delete token', () => {
    beforeEach(() => {
      prismaService.token.delete = jest.fn();
    });

    test('it would call the delete method once', async () => {
      await service.deleteToken(refreshToken);
      expect(prismaService.token.delete).toBeCalledWith({
        where: { token: mockToken.token },
      });
    });
  });

  describe('get tokens', () => {
    const access = 'access';
    const refresh = 'refresh';
    beforeEach(() => {
      jwtService.signAsync = jest
        .fn()
        .mockReturnValueOnce(access)
        .mockReturnValueOnce(refresh);
    });

    describe('when getTokens is called', () => {
      const jwtPayload: JwtPayload = {
        sub: mockAuth.id,
        email: mockAuth.email,
        login: mockAuth.login,
      };
      let tokens: Tokens;

      beforeEach(async () => {
        tokens = await service.getTokens(
          mockAuth.id,
          mockAuth.email,
          mockAuth.login,
        );
      });

      test('then it would call jwtService signAsync method', async () => {
        expect(jwtService.signAsync).toBeCalledWith(jwtPayload, {
          secret: process.env.ACCESS_SECRET_KEY,
          expiresIn: process.env.ACCESS_EXPIRES_IN_SECONDS,
        });
        expect(jwtService.signAsync).toBeCalledWith(jwtPayload, {
          secret: process.env.ACCESS_SECRET_KEY,
          expiresIn: process.env.ACCESS_EXPIRES_IN_SECONDS,
        });
      });

      test('then it would return a value', async () => {
        expect(tokens).toEqual({ accessToken: access, refreshToken: refresh });
      });
    });
  });
});
