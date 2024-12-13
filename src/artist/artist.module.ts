import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => FavsModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
