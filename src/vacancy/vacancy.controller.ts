import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Delete,
  Query,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import {
  CreateVacancyDto,
  Roles,
  UpdateVacancyDto,
  UserRoleEnum,
} from 'src/auth/Config';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post('vacancy/create')
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.createVacancy(createVacancyDto);
  }

  @Get()
  findAll() {
    return this.vacancyService.findListVacancies();
  }

  // @ApiResponse({
  //   type: CreateVacancyDto,
  // })
  // @Roles(UserRoleEnum.admin)
  @Get(':id/vacancy')
  async getByVacancyId(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.findByVacancy(id);
  }

  @Patch(':id/vacancy')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    return this.vacancyService.update(+id, updateVacancyDto);
  }

  // @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id/vacancy')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.delete(id);
  }
}
