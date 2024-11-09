import { Module } from '@nestjs/common';
import { ArtistModule } from '../artist/artist.module';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [ArtistModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
