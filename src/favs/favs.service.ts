import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavEntity } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @InjectRepository(FavEntity)
    private favsRepository: Repository<FavEntity>,
  ) {}

  async getAll(): Promise<FavEntity> {
    const records = await this.favsRepository.find();

    return records.reduce(
      (acc, record) => {
        acc.albums.push(...record.albums);
        acc.artists.push(...record.artists);
        acc.tracks.push(...record.tracks);
        return acc;
      },
      {
        albums: [],
        artists: [],
        tracks: [],
      },
    );
  }

  async addTrack(trackId: string): Promise<string> {
    const track = await this.trackService.getById(trackId);

    if (!track) {
      return null;
    }

    const isFavourite = await this.favsRepository.findOneBy({
      tracks: { id: trackId },
    });

    if (!isFavourite) {
      await this.favsRepository.save({ tracks: [track] });
    }

    return `Track ${track.name} is added to favorites`;
  }

  async deleteTrack(trackId: string): Promise<string> {
    const tracks = await this.favsRepository.findBy({
      tracks: { id: trackId },
    });

    if (!tracks.length) {
      return null;
    }

    await this.favsRepository.remove(tracks);

    return `Track ${trackId} is removed from favorites`;
  }

  async addAlbum(albumId: string): Promise<string> {
    const album = await this.albumService.getById(albumId);

    if (!album) {
      return null;
    }

    const isFavourite = await this.favsRepository.findOneBy({
      albums: { id: albumId },
    });

    if (!isFavourite) {
      await this.favsRepository.save({ albums: [album] });
    }

    return `Album ${album.name} is added to favorites`;
  }

  async deleteAlbum(albumId: string): Promise<string> {
    const albums = await this.favsRepository.findBy({
      albums: { id: albumId },
    });

    if (!albums.length) {
      return null;
    }

    await this.favsRepository.remove(albums);

    return `Album ${albumId} is removed from favorites`;
  }

  async addArtist(artistId: string): Promise<string> {
    const artist = await this.artistService.getById(artistId);

    if (!artist) {
      return null;
    }

    const isFavourite = await this.favsRepository.findOneBy({
      artists: { id: artistId },
    });

    if (!isFavourite) {
      await this.favsRepository.save({ artists: [artist] });
    }

    return `Artist ${artist.name} is added to favorites`;
  }

  async deleteArtist(artistId: string): Promise<string> {
    const artists = await this.favsRepository.findBy({
      artists: { id: artistId },
    });

    if (!artists.length) {
      return null;
    }

    await this.favsRepository.remove(artists);

    return `Artist ${artistId} is removed from favorites`;
  }
}
