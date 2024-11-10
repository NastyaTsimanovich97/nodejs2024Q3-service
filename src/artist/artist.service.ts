import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  private artists: ArtistEntity[] = [
    {
      id: '8cd4e165-954c-4268-ad5c-0f13ba0188ec',
      name: 'DDT',
      grammy: false,
    },
    {
      id: 'c3f9f2a5-9f9e-4e9d-9e9d-9f9e4e9d2a5c',
      name: 'The Rolling Stones',
      grammy: true,
    },
  ];

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    const createdArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.artists.push(createdArtist);

    return createdArtist;
  }

  getAll(): ArtistEntity[] {
    return this.artists;
  }

  getById(id: string): ArtistEntity {
    return this.artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistEntity {
    const updatedArtistRecord = this.getById(id);

    if (!updatedArtistRecord) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = {
      ...updatedArtistRecord,
      ...updateArtistDto,
    };

    this.artists = this.artists.map((artist) =>
      artist.id === id ? updatedArtist : artist,
    );

    return updatedArtist;
  }

  delete(id: string): string {
    const removedArtistRecord = this.getById(id);

    if (!removedArtistRecord) {
      throw new NotFoundException('Artist not found');
    }

    this.artists = this.artists.filter((artist) => artist.id !== id);

    this.albumService.deleteByArtistId(id);
    this.trackService.deleteByArtistId(id);
    this.favsService.deleteArtist(id);

    return `Artist ${id} is removed`;
  }
}
