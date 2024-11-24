import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  ForbiddenException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { UserEntity } from '../user/entities/user.entity';
import { RefreshTokenDto } from './dto/tokens.dto';
import { AuthGuard } from './guards/auth.guard';

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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    if (!refreshTokenDto.refreshToken) {
      throw new UnauthorizedException('Refresh token is not provided');
    }

    const { refreshToken } = refreshTokenDto;

    let userId;
    try {
      userId = await this.authService.verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedException(
        `Authentication token is not valid. ${error.message}`,
      );
    }

    const respose = await this.authService.refresh(userId);

    if (!respose) {
      throw new UnauthorizedException('User not found');
    }

    return respose;
  }
}
