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

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post()
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.createVacancy(createVacancyDto);
  }

  @Get()
  findAll() {
    return this.vacancyService.findListVacancies();
  }

  @ApiResponse({
    type: CreateVacancyDto,
  })
  @Roles(UserRoleEnum.admin)
  @Get(':id')
  async getByVacancyId(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.findByVacancy(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    return this.vacancyService.update(+id, updateVacancyDto);
  }

  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.delete(id);
  }
}
