import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { User, Vacancy, Technology, Company } from './entities';
import { Vacancies_Technologies } from './entities/technology_vacancy.entity';

export default <TypeOrmModuleAsyncOptions>{
  inject: [ConfigService],

  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return <PostgresConnectionOptions>{
      type: 'postgres',
<<<<<<< HEAD
      host: configService.get(
        'DB_HOST' || 'DATABASE_URL' || 'POSTGRES_HOST' || 'POSTGRES_URL',
      ),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME' || 'POSTGRES_USER'),
      password: configService.get('DB_PASSWORD' || 'POSTGRES_PASSWORD'),
      database: configService.get('DB_NAME' || 'POSTGRES_DATABASE'),
=======
      host: configService.get('PGHOST'),
      port: +configService.get('PGPORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('PGDATABASE'),
>>>>>>> origin/main
      entities: [User, Vacancy, Technology, Company],
      synchronize: true,
      logging: true,
    };
  },
};
