import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UnprocessableEntityException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { IdParamDto } from '../common/dto/idParam.dto';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAll() {
    return this.favsService.getAll();
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
  @HttpCode(204)
  deleteTrack(@Param() { id }: IdParamDto) {
    const result = this.favsService.deleteTrack(id);

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
  @HttpCode(204)
  deleteAlbum(@Param() { id }: IdParamDto) {
    const result = this.favsService.deleteAlbum(id);

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
  @HttpCode(204)
  deleteArtist(@Param() { id }: IdParamDto) {
    const result = this.favsService.deleteArtist(id);

    if (!result) {
      throw new NotFoundException('Artist is not favorite');
    }

    return result;
  }
}
