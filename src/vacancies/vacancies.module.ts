import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyService } from './vacancies.service';
import { VacancyController } from './vacancies.controller';
import { Vacancy } from '../database/entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [VacancyController],
  providers: [VacancyService],
  exports: [VacancyService],
})
export class VacancyModule {}
