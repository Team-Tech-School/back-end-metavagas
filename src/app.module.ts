import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database';
import { UsersModule } from './user';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { TechnologysModule } from './technology/technology.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CompanyModule,
    VacancyModule,
    TechnologysModule,
  ],
})
export class AppModule {}
