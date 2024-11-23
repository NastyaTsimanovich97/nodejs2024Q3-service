import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { UserEntity } from '../user/entities/user.entity';
import { RefreshTokenDto } from './dto/tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserEntity })
  create(@Body() loginDto: LoginDto) {
    return this.authService.signup(loginDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const response = await this.authService.login(loginDto);

    if (!response) {
      throw new ForbiddenException('Login or password is not correct');
    }

    return response;
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    if (!refreshTokenDto.refreshToken) {
      throw new UnauthorizedException('Refresh token is not provided');
    }

    return this.authService.refresh(refreshTokenDto);
  }
}
