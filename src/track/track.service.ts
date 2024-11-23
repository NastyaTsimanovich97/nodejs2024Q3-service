import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { FavsService } from '../favs/favs.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

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

    this.tracks.push(newTrack);

    return newTrack;
  }

  getAll(): TrackEntity[] {
    return this.tracks;
  }

  getById(id: string): TrackEntity {
    return this.tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackEntity | null {
    const trackRecord = this.getById(id);

    if (!trackRecord) {
      return null;
    }

    const updatedTrack = {
      ...trackRecord,
      ...updateTrackDto,
    };

    this.tracks = this.tracks.map((track) =>
      track.id === id ? updatedTrack : track,
    );

    return updatedTrack;
  }

  delete(id: string): string | null {
    const trackRecord = this.getById(id);

    if (!trackRecord) {
      return null;
    }

    this.tracks = this.tracks.filter((track) => track.id !== id);

    this.favsService.deleteTrack(id);

    return `Track ${id} is removed`;
  }

  deleteByArtistId(artistId: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artistId) {
        return { ...track, artistId: null };
      }

      return track;
    });
  }

  deleteByAlbumId(albumId: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === albumId) {
        return { ...track, albumId: null };
      }
      return track;
    });
  }
}
