import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { IdParamDto } from '../common/dto/idParam.dto';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getById(@Param() { id }: IdParamDto) {
    const result = this.trackService.getById(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }

    return result;
  }

  @Put(':id')
  update(@Param() { id }: IdParamDto, @Body() updateTrackDto: UpdateTrackDto) {
    const result = this.trackService.update(id, updateTrackDto);

    if (!result) {
      throw new NotFoundException('Track not found');
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: IdParamDto) {
    const result = this.trackService.delete(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }

    return result;
  }
}
