import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { UsersModule } from './users';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './companies/companies.module';
import { VacancyModule } from './vacancies/vacancies.module';
import { TechnologysModule } from './technologies/technologies.module';

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
