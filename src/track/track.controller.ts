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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '../auth/guards/auth.guard';
import { IdParamDto } from '../common/dto/idParam.dto';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
@UseGuards(AuthGuard)
@ApiBearerAuth()
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
  async getById(@Param() { id }: IdParamDto) {
    const result = await this.trackService.getById(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }

    return result;
  }

  @Put(':id')
  async update(
    @Param() { id }: IdParamDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const result = await this.trackService.update(id, updateTrackDto);

    if (!result) {
      throw new NotFoundException('Track not found');
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: IdParamDto) {
    const result = await this.trackService.delete(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }

    return result;
  }
}
