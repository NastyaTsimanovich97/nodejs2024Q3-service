import { Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  imports: [AlbumModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
