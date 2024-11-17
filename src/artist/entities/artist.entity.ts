import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { AlbumEntity } from '../../album/entities/album.entity';
import { TrackEntity } from '../../track/entities/track.entity';
import { FavEntity } from '../../favs/entities/fav.entity';

@Entity({ name: 'artist' })
export class ArtistEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums?: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks?: TrackEntity[];

  @ManyToMany(() => FavEntity, (fav) => fav.artists)
  favs?: FavEntity[];
}
