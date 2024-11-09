import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';

import { IdParamDto } from '../common/dto/idParam.dto';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param() { id }: IdParamDto) {
    const result = this.favsService.addTrack(id);

    if (!result) {
      throw new UnprocessableEntityException('Track not found');
    }

    return result;
  }

  @Delete('track/:id')
  removeTrack(@Param() { id }: IdParamDto) {
    const result = this.favsService.removeTrack(id);

    if (!result) {
      throw new NotFoundException('Track is not favorite');
    }

    return result;
  }

  @Post('album/:id')
  addAlbum(@Param() { id }: IdParamDto) {
    const result = this.favsService.addAlbum(id);

    if (!result) {
      throw new UnprocessableEntityException('Album not found');
    }

    return result;
  }

  @Delete('album/:id')
  removeAlbum(@Param() { id }: IdParamDto) {
    const result = this.favsService.removeAlbum(id);

    if (!result) {
      throw new NotFoundException('Album is not favorite');
    }

    return result;
  }

  @Post('artist/:id')
  addArtist(@Param() { id }: IdParamDto) {
    const result = this.favsService.addArtist(id);

    if (!result) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return result;
  }

  @Delete('artist/:id')
  removeArtist(@Param() { id }: IdParamDto) {
    const result = this.favsService.removeArtist(id);

    if (!result) {
      throw new NotFoundException('Artist is not favorite');
    }

    return result;
  }
}
