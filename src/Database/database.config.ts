import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import {
  User,
  Vacancy,
  Technology,
  Company,
  VacancyToTechnology,
} from './entities';

export default <TypeOrmModuleAsyncOptions>{
  inject: [ConfigService],

  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return <PostgresConnectionOptions>{
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [User, Vacancy, Technology, Company, VacancyToTechnology],
      synchronize: true,
    };
  },
};
