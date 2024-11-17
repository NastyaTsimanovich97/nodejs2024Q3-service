import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { TrackEntity } from '../../track/entities/track.entity';
import { AbstractIdEntity } from '../../common/entities/abstract.entity';

@Entity('fav')
export class FavEntity extends AbstractIdEntity {
  @ManyToMany(() => ArtistEntity, (artist) => artist.favs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  artists?: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, (album) => album.favs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  albums?: AlbumEntity[];

  @ManyToMany(() => TrackEntity, (track) => track.favs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tracks?: TrackEntity[];
}
