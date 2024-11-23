const DEFAULT_PORT = 3000;

export default () =>
  ({
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
    logging: {
      level: process.env.LOG_LEVEL || 'log',
    },
    database: {
      type: 'postgres' as const,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['/**/.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      migrationsTableName: 'migrations',
      migrationsRun: false,
      migrations: ['../migrations/*.ts'],
      cli: {
        migrationsDir: 'migrations',
      },
      logging: false,
    },
    auth: {
      salt: parseInt(process.env.SALT, 10),
      secret: process.env.JWT_SECRET_KEY,
      refreshSecret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      refreshExpiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    },
  } as const);
