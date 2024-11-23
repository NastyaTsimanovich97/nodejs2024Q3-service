import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';

@Module({
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => FavsModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
