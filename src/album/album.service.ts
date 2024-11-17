import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const createdAlbum: AlbumEntity = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    await this.albumRepository.save(createdAlbum);

    return createdAlbum;
  }

  async getAll(): Promise<AlbumEntity[]> {
    return this.albumRepository.find();
  }

  async getById(id: string): Promise<AlbumEntity> {
    return this.albumRepository.findOneBy({ id });
  }

  async getOneByArtistAndAlbum(
    id: string,
    artistId: string,
  ): Promise<AlbumEntity> {
    return this.albumRepository.findOneBy({ id, artistId });
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const albumRecord = await this.getById(id);

    if (!albumRecord) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = {
      ...albumRecord,
      ...updateAlbumDto,
    };

    await this.albumRepository.update({ id }, updatedAlbum);

    return updatedAlbum;
  }

  async delete(id: string): Promise<string> {
    const albumRecord = await this.getById(id);

    if (!albumRecord) {
      throw new NotFoundException('Album not found');
    }

    await this.albumRepository.delete({ id });

    // this.trackService.deleteByAlbumId(id);
    // this.favsService.addAlbum(id);

    return `Album ${id} is removed`;
  }

  // async deleteByArtistId(artistId: string): void {
  //   this.albums = this.albums.map((album) => {
  //     if (album.artistId === artistId) {
  //       return { ...album, artistId: null };
  //     }

  //     return album;
  //   });
  // }
}
