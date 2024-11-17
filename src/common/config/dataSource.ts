import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres' as const,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    'src/album/entities/*.entity.ts',
    'src/artist/entities/*.entity.ts',
    'src/track/entities/*.entity.ts',
    'src/favs/entities/*.entity.ts',
    'src/user/entities/*.entity.ts',
  ],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  migrations: ['migrations/*.ts'],
  logging: true,
});
