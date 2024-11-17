import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { AbstractIdEntity } from '../../common/entities/abstract.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { TrackEntity } from '../../track/entities/track.entity';
import { FavEntity } from '../../favs/entities/fav.entity';

@Entity('album')
export class AlbumEntity extends AbstractIdEntity {
  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ name: 'artist_id', nullable: true })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artist_id' })
  artist?: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks?: TrackEntity[];

  @ManyToMany(() => FavEntity, (fav) => fav.albums)
  favs?: FavEntity[];
}
