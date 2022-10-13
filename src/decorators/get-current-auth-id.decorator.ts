import { JwtPayload } from '@/auth/models';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentAuthId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const auth = request.user as JwtPayload;
    return auth.sub;
  },
);
