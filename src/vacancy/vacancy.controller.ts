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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { VacancyService } from './vacancy.service';
import {
  AuthGuard,
  CreateVacancyDto,
  RoleGuard,
  Roles,
  UpdateVacancyDto,
  UserRoleEnum,
} from '../auth/config';

@ApiTags('vacancy')
@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.advertiser)
  @Post()
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.createVacancy(createVacancyDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin, UserRoleEnum.advertiser)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    return this.vacancyService.update(+id, updateVacancyDto);
  }

  @Get()
  async findAllVacancies(
    @Query('tecName') tecName?: string,
    @Query('vacancyRole') vacancyRole?: string,
    @Query('minSalary') minSalary?: number,
    @Query('maxSalary') maxSalary?: number,
    @Query('vacancyType') vacancyType?: string,
    @Query('location') location?: string,
  ) {
    return await this.vacancyService.searchVacancies(
      tecName,
      vacancyRole,
      minSalary,
      maxSalary,
      vacancyType,
      location,
    );
  }

  @ApiResponse({
    type: CreateVacancyDto,
  })
  @Get(':id')
  async getByVacancyId(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.getVacancyById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin, UserRoleEnum.advertiser)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.delete(id);
  }
}
