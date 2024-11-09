import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';

import { IdParamDto } from '../common/dto/idParam.dto';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdParamDto) {
    const artist = this.artistService.findOne(id);

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
  remove(@Param() { id }: IdParamDto) {
    return this.artistService.remove(id);
  }
}
