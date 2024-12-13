import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '../auth/guards/auth.guard';
import { IdParamDto } from '../common/dto/idParam.dto';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  async getById(@Param() { id }: IdParamDto) {
    const artist = await this.artistService.getById(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Put(':id')
  update(
    @Param() { id }: IdParamDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: IdParamDto) {
    return this.artistService.delete(id);
  }
}
