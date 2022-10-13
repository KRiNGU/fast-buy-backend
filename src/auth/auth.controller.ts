import { GetCurrentAuthId } from '@/decorators/get-current-auth-id.decorator';
import { GetCurrentAuth } from '@/decorators/get-current-auth.decorator';
import { Public } from '@/decorators/public.decorator';
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
  @Public()
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    return this.authService.logout();
  }

  @Post('/refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentAuthId() authId: number,
    @GetCurrentAuth('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(refreshToken);
  }
}
