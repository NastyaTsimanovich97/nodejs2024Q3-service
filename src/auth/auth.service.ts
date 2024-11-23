import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login-auth.dto';
import { PayloadDto, RefreshTokenDto, TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly salt = this.configService.get('auth.salt');
  private readonly secret = this.configService.get('auth.secret');
  private readonly refreshSecret = this.configService.get('auth.refreshSecret');
  private readonly expiresIn = this.configService.get('auth.expiresIn');
  private readonly refreshExpiresIn = this.configService.get(
    'auth.refreshExpiresIn',
  );

  async signup(loginDto: LoginDto) {
    const hash = await this.generateHash(loginDto.password);

    return this.userService.create({ ...loginDto, password: hash });
  }

  async login(loginDto: LoginDto): Promise<TokensDto> {
    const user = await this.userService.getByLogin(loginDto.login);

    if (!user) return null;

    const isPasswordCorrect = await this.compareHash(
      loginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) return null;

    const accessToken = await this.generateAccessToken({
      userId: user.id,
      login: user.login,
    });
    const refreshToken = await this.generateRefreshToken({
      userId: user.id,
      login: user.login,
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<TokensDto> {
    const accessToken = '';
    const refreshToken = '';

    return { accessToken, refreshToken };
  }

  private generateAccessToken(payload: PayloadDto): Promise<string> {
    console.log('this.expiresIn', this.expiresIn);
    return this.jwtService.signAsync(payload, {
      secret: this.secret,
      expiresIn: this.expiresIn,
    });
  }

  private generateRefreshToken(payload: PayloadDto): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresIn,
    });
  }

  private async generateHash(password: string) {
    const salt = await bcrypt.genSalt(this.salt);
    return bcrypt.hash(password, salt);
  }

  private async compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
