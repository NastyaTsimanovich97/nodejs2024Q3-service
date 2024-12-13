import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
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

    await this.artistRepository.update({ id }, updatedArtist);

    return updatedArtist;
  }

  async delete(id: string): Promise<string> {
    const removedArtistRecord = await this.getById(id);

    if (!removedArtistRecord) {
      throw new NotFoundException('Artist not found');
    }

    await this.favsService.deleteArtist(id);
    await this.artistRepository.delete({ id });

    return `Artist ${id} is removed`;
  }
}
