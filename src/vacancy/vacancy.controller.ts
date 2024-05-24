import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VacancyService } from './vacancy.service';
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
import {
  AuthGuard,
  CreateVacancyDto,
  RoleGuard,
  Roles,
  UpdateVacancyDto,
  UserRoleEnum,
} from '../auth/config';
import {
  ApiCreateVacanciesDocs,
  ApiDeleteVacanciesDocs,
  ApiGetByIdVacanciesDocs,
  ApiGetVacanciesDocs,
  ApiPathVacanciesDocs,
  ApiQueryVacanciesDocs,
} from 'src/docs';

@ApiTags('Vacancy')
@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}
  @ApiGetVacanciesDocs()
  @ApiQueryVacanciesDocs()
  @Get()
  async getAllVacanciesPublic(
    @Query('tecName') tecName?: string,
    @Query('vacancyRole') vacancyRole?: string,
    @Query('level') level?: string,
    @Query('minSalary') minSalary?: number,
    @Query('maxSalary') maxSalary?: number,
    @Query('vacancyType') vacancyType?: string,
    @Query('location') location?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return await this.vacancyService.searchVacancies(
      tecName,
      vacancyRole,
      level,
      minSalary,
      maxSalary,
      vacancyType,
      location,
      page,
      limit,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiGetVacanciesDocs()
  @ApiQueryVacanciesDocs()
  @Get('vacancies')
  async findAllVacancies(
    @Query('tecName') tecName?: string,
    @Query('vacancyRole') vacancyRole?: string,
    @Query('level') level?: string,
    @Query('minSalary') minSalary?: number,
    @Query('maxSalary') maxSalary?: number,
    @Query('vacancyType') vacancyType?: string,
    @Query('location') location?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return await this.vacancyService.searchVacancies(
      tecName,
      vacancyRole,
      level,
      minSalary,
      maxSalary,
      vacancyType,
      location,
      page,
      limit,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.advertiser)
  @ApiCreateVacanciesDocs()
  @Post('create')
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.createVacancy(createVacancyDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin, UserRoleEnum.advertiser)
  @ApiPathVacanciesDocs()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    return this.vacancyService.update(+id, updateVacancyDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiGetByIdVacanciesDocs()
  @Get(':id')
  async getByVacancyId(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.getVacancyById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @ApiDeleteVacanciesDocs()
  @Roles(UserRoleEnum.admin, UserRoleEnum.advertiser)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.delete(id);
  }
}
