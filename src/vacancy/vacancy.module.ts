import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { Vacancy } from 'src/Database/entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [VacancyController],
  providers: [VacancyService],
  exports: [VacancyService],
})
export class VacancyModule {}
