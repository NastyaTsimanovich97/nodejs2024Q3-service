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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  async getById(@Param() { id }: IdParamDto) {
    const album = await this.albumService.getById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Put(':id')
  update(@Param() { id }: IdParamDto, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: IdParamDto) {
    return this.albumService.delete(id);
  }
}
