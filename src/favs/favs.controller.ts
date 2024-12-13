import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UnprocessableEntityException,
  NotFoundException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '../auth/guards/auth.guard';
import { IdParamDto } from '../common/dto/idParam.dto';
import { FavsService } from './favs.service';

@Controller('favs')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAll() {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param() { id }: IdParamDto) {
    const result = await this.favsService.addTrack(id);

    if (!result) {
      throw new UnprocessableEntityException('Track not found');
    }

    return result;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() { id }: IdParamDto) {
    const result = await this.favsService.deleteTrack(id);

    if (!result) {
      throw new NotFoundException('Track is not favorite');
    }

    return result;
  }

  @Post('album/:id')
  async addAlbum(@Param() { id }: IdParamDto) {
    const result = await this.favsService.addAlbum(id);

    if (!result) {
      throw new UnprocessableEntityException('Album not found');
    }

    return result;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() { id }: IdParamDto) {
    const result = await this.favsService.deleteAlbum(id);

    if (!result) {
      throw new NotFoundException('Album is not favorite');
    }

    return result;
  }

  @Post('artist/:id')
  async addArtist(@Param() { id }: IdParamDto) {
    const result = await this.favsService.addArtist(id);

    if (!result) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return result;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() { id }: IdParamDto) {
    const result = await this.favsService.deleteArtist(id);

    if (!result) {
      throw new NotFoundException('Artist is not favorite');
    }

    return result;
  }
}
