import { Global, Module } from '@nestjs/common';
import { TechnologysVacanciesService } from './technologys_vacancies.service';
import { TechnologysVacanciesController } from './technologys_vacancies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyToTechnology } from 'src/Database/entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([VacancyToTechnology])],
  controllers: [TechnologysVacanciesController],
  providers: [TechnologysVacanciesService],
  exports: [TechnologysVacanciesService],
})
export class TechnologysVacanciesModule {}
