import {
  // forwardRef,
  // Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { v4 as uuidv4 } from 'uuid';
// import { AlbumService } from '../album/album.service';
// import { TrackService } from '../track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
// import { FavsService } from '../favs/favs.service';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    // private readonly albumService: AlbumService,
    // @Inject(forwardRef(() => TrackService))
    // private readonly trackService: TrackService,
    // @Inject(forwardRef(() => FavsService))
    // private readonly favsService: FavsService,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const createdArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    await this.artistRepository.save(createdArtist);

    return createdArtist;
  }

  async getAll(): Promise<ArtistEntity[]> {
    return this.artistRepository.find();
  }

  async getById(id: string): Promise<ArtistEntity> {
    return this.artistRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const updatedArtistRecord = await this.getById(id);

    if (!updatedArtistRecord) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = {
      ...updatedArtistRecord,
      ...updateArtistDto,
    };

    this.artistRepository.update({ id }, updatedArtist);

    return updatedArtist;
  }

  async delete(id: string): Promise<string> {
    const removedArtistRecord = await this.getById(id);

    if (!removedArtistRecord) {
      throw new NotFoundException('Artist not found');
    }

    this.artistRepository.delete({ id });

    // this.albumService.deleteByArtistId(id);
    // this.trackService.deleteByArtistId(id);
    // this.favsService.deleteArtist(id);

    return `Artist ${id} is removed`;
  }
}
