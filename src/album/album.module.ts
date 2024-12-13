import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
