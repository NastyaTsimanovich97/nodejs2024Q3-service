import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractIdEntity } from '../../common/entities/abstract.entity';
import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { FavEntity } from '../../favs/entities/fav.entity';

@Entity({ name: 'track' })
export class TrackEntity extends AbstractIdEntity {
  @Column()
  name: string;

  @Column({ name: 'artist_id', nullable: true })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artist_id' })
  artist?: ArtistEntity;

  @Column({ name: 'album_id', nullable: true })
  albumId: string | null; // refers to Album

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'album_id' })
  album?: AlbumEntity;

  @Column()
  duration: number; // integer number

  @ManyToMany(() => FavEntity, (fav) => fav.tracks)
  favs?: FavEntity[];
}
