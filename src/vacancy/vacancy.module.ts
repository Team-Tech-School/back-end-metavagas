import { Global, Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology, Vacancy } from 'src/database/entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [VacancyController],
  providers: [VacancyService],
  exports: [VacancyService],
})
export class VacancyModule {}
