import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

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
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  albumId: string | null;
}
