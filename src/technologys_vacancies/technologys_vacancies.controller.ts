import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TechnologysVacanciesService } from './technologys_vacancies.service';
@Controller('technologys-vacancies')
export class TechnologysVacanciesController {
  constructor(
    private readonly technologysVacanciesService: TechnologysVacanciesService,
  ) {}

  @Get()
  findAll() {
    return this.technologysVacanciesService.findAll();
  }
}
