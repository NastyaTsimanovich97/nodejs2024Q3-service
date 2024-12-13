import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack: TrackEntity = {
      id: uuidv4(),
      ...createTrackDto,
    };

    await this.trackRepository.save(newTrack);

    return newTrack;
  }

  async getAll(): Promise<TrackEntity[]> {
    return this.trackRepository.find();
  }

  async getById(id: string): Promise<TrackEntity> {
    return this.trackRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity | null> {
    const trackRecord = await this.getById(id);

    if (!trackRecord) {
      return null;
    }

    const updatedTrack = {
      ...trackRecord,
      ...updateTrackDto,
    };

    await this.trackRepository.update({ id }, updatedTrack);

    return updatedTrack;
  }

  async delete(id: string): Promise<string | null> {
    const trackRecord = await this.getById(id);

    if (!trackRecord) {
      return null;
    }

    await this.favsService.deleteTrack(id);
    await this.trackRepository.delete({ id });

    return `Track ${id} is removed`;
  }

  // deleteByArtistId(artistId: string): void {
  //   this.tracks = this.tracks.map((track) => {
  //     if (track.artistId === artistId) {
  //       return { ...track, artistId: null };
  //     }

  //     return track;
  //   });
  // }

  // deleteByAlbumId(albumId: string): void {
  //   this.tracks = this.tracks.map((track) => {
  //     if (track.albumId === albumId) {
  //       return { ...track, albumId: null };
  //     }
  //     return track;
  //   });
  // }
}
