import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  artistId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  albumId: string;
}
