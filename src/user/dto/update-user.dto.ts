import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
}
