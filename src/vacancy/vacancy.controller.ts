import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto, UpdateVacancyDto } from 'src/auth/Config';

@Controller()
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post('/vacancy/create')
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.createVacancy(createVacancyDto);
  }

  @Get()
  findAll() {
    return this.vacancyService.findAllList();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vacancyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
  //   return this.vacancyService.update(+id, updateVacancyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vacancyService.remove(+id);
  // }
}
