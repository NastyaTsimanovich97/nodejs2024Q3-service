import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './common/config/configuration';
import { typeOrmAsyncConfig } from './common/config/typeOrmAsyncConfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { LoggingModule } from './common/logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AlbumModule,
    ArtistModule,
    FavsModule,
    TrackModule,
    UserModule,
    LoggingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
