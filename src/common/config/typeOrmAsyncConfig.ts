import { ConfigService, ConfigModule } from '@nestjs/config';

export const typeOrmAsyncConfig = {
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    console.log(configService.get('database'));
    return {
      ...configService.get('database'),
    };
  },
};
