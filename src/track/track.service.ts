import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumService } from '../album/album.service';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly albumService: AlbumService) {}

  private tracks: TrackEntity[] = [
    {
      id: '68b2123c-4a20-4138-9d00-4f89eb06d5ac',
      name: 'Любовь не пропала',
      albumId: '18b2123c-4a20-4138-9d00-4f89eb06d5ac',
      artistId: '8cd4e165-954c-4268-ad5c-0f13ba0188ec',
      duration: 360,
    },
    {
      id: '68b2123c-4a20-4138-9d00-4f89eb06d5ac',
      name: 'Miss you',
      albumId: '48b2123c-4a20-4138-9d00-4f89eb06d5ac',
      artistId: 'c3f9f2a5-9f9e-4e9d-9e9d-9f9e4e9d2a5c',
      duration: 289,
    },
  ];

  create(createTrackDto: CreateTrackDto): TrackEntity {
    const newTrack: TrackEntity = {
      id: uuidv4(),
      ...createTrackDto,
    };

    const isAlbumExist = this.checkAlbum(
      createTrackDto.albumId,
      createTrackDto.artistId,
    );

    if (!isAlbumExist) {
      throw new BadRequestException('Album does not exist');
    }

    this.tracks.push(newTrack);

    return newTrack;
  }

  findAll(): TrackEntity[] {
    return this.tracks;
  }

  findOne(id: string): TrackEntity {
    return this.tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackEntity | null {
    const trackRecord = this.findOne(id);

    if (!trackRecord) {
      return null;
    }

    const updatedTrack = {
      ...trackRecord,
      ...updateTrackDto,
    };

    const isAlbumExist = this.checkAlbum(
      updateTrackDto.albumId,
      updateTrackDto.artistId,
    );

    if (updateTrackDto.albumId && updateTrackDto.artistId && !isAlbumExist) {
      throw new BadRequestException('Album does not exist');
    }

    this.tracks = this.tracks.map((track) =>
      track.id === id ? updatedTrack : track,
    );

    return updatedTrack;
  }

  remove(id: string): string | null {
    const trackRecord = this.findOne(id);

    if (!trackRecord) {
      return null;
    }

    this.tracks = this.tracks.filter((track) => track.id !== id);

    return `Track ${id} is removed`;
  }

  private checkAlbum(albumId: string, artistId: string): boolean {
    return !!this.albumService.findOneByArtistAndAlbum(albumId, artistId);
  }
}
