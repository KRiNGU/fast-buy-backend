import { GetCurrentAuthId } from '@/decorators/get-current-auth-id.decorator';
import { GetCurrentAuth } from '@/decorators/get-current-auth.decorator';
import { NoAccessToken } from '@/decorators/no-access-token.decorator';
import { RefreshTokenGuard } from '@/guards/refresh-token.guard';
import { PrismaExceptionFilter } from '@filters/prisma-exception.filter';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Tokens } from './models';

@UseFilters(new PrismaExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @NoAccessToken()
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  @NoAccessToken()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @NoAccessToken()
  @UseGuards(RefreshTokenGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentAuth('refreshToken') refreshToken: string) {
    return this.authService.logout(refreshToken);
  }

  @Post('/logout/all')
  @HttpCode(HttpStatus.OK)
  logoutAll(@GetCurrentAuthId() authId: number) {
    return this.authService.logoutAll(authId);
  }

  @NoAccessToken()
  @Post('/refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentAuthId() authId: number,
    @GetCurrentAuth('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshToken(authId, refreshToken);
  }
}
