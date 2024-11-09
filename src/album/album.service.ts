import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { ArtistService } from '../artist/artist.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly artistService: ArtistService) {}

  private albums: AlbumEntity[] = [
    {
      id: '18b2123c-4a20-4138-9d00-4f89eb06d5ac',
      name: 'Галя ходи',
      artistId: '8cd4e165-954c-4268-ad5c-0f13ba0188ec',
      year: 2018,
    },
    {
      id: '48b2123c-4a20-4138-9d00-4f89eb06d5ac',
      name: 'Some Girls',
      artistId: 'c3f9f2a5-9f9e-4e9d-9e9d-9f9e4e9d2a5c',
      year: 1978,
    },
  ];

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const createdAlbum: AlbumEntity = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    const isArtistExist = this.checkArtist(createAlbumDto.artistId);

    if (!isArtistExist) {
      throw new BadRequestException('Artist does not exist');
    }

    this.albums.push(createdAlbum);

    return createdAlbum;
  }

  findAll(): AlbumEntity[] {
    return this.albums;
  }

  findOne(id: string): AlbumEntity {
    return this.albums.find((album) => album.id === id);
  }

  findOneByArtistAndAlbum(id: string, artistId: string): AlbumEntity {
    return this.albums.find(
      (album) => album.id === id && album.artistId === artistId,
    );
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumEntity {
    const albumRecord = this.findOne(id);

    if (!albumRecord) {
      throw new NotFoundException('Album not found');
    }

    const isArtistExist = this.checkArtist(updateAlbumDto.artistId);

    if (updateAlbumDto.artistId && !isArtistExist) {
      throw new BadRequestException('Artist does not exist');
    }

    const updatedAlbum = {
      ...albumRecord,
      ...updateAlbumDto,
    };

    this.albums = this.albums.map((album) =>
      album.id === id ? updatedAlbum : album,
    );

    return updatedAlbum;
  }

  remove(id: string) {
    const albumRecord = this.findOne(id);

    if (!albumRecord) {
      throw new NotFoundException('Album not found');
    }

    this.albums = this.albums.filter((album) => album.id !== id);

    return `Album ${id} is removed`;
  }

  private checkArtist(artistId: string): boolean {
    return !!this.artistService.findOne(artistId);
  }
}
