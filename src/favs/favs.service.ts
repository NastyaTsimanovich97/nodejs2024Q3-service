import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavEntity } from './entities/fav.entity';

@Injectable()
export class FavsService {
  private favs: FavEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAll(): FavEntity {
    return this.favs;
  }

  addTrack(trackId: string): string {
    const track = this.trackService.getById(trackId);

    if (!track) {
      return null;
    }

    const isFavourite = this.favs.tracks.find((track) => track.id === trackId);

    if (!isFavourite) {
      this.favs.tracks.push(track);
    }

    return `Track ${track.name} is added to favorites`;
  }

  deleteTrack(trackId: string): string {
    const track = this.favs.tracks.find((track) => track.id === trackId);

    if (!track) {
      return null;
    }

    this.favs.tracks = this.favs.tracks.filter((track) => track.id !== trackId);

    return `Track ${track.name} is removed from favorites`;
  }

  addAlbum(albumId: string): string {
    const album = this.albumService.getById(albumId);

    if (!album) {
      return null;
    }

    const isFavourite = this.favs.albums.find((album) => album.id === albumId);

    if (!isFavourite) {
      this.favs.albums.push(album);
    }

    return `Album ${album.name} is added to favorites`;
  }

  deleteAlbum(albumId: string): string {
    const album = this.favs.albums.find((album) => album.id === albumId);

    if (!album) {
      return null;
    }

    this.favs.albums = this.favs.albums.filter((album) => album.id !== albumId);

    return `Album ${album.name} is removed from favorites`;
  }

  addArtist(artistId: string): string {
    const artist = this.artistService.getById(artistId);

    if (!artist) {
      return null;
    }

    const isFavourite = this.favs.artists.find(
      (artist) => artist.id === artistId,
    );

    if (!isFavourite) {
      this.favs.artists.push(artist);
    }

    return `Artist ${artist.name} is added to favorites`;
  }

  deleteArtist(artistId: string): string {
    const artist = this.favs.artists.find((artist) => artist.id === artistId);

    if (!artist) {
      return null;
    }

    this.favs.artists = this.favs.artists.filter(
      (artist) => artist.id !== artistId,
    );

    return `Artist ${artist.name} is removed from favorites`;
  }
}
