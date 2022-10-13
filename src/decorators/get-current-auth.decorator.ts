import { JwtPayloadWithRefreshToken } from '@/auth/models';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentAuth = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | null,
    context: ExecutionContext,
  ): number => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
