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
  HttpException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { VacancyService } from './vacancy.service';
import {
  AuthGuard,
  CreateVacancyDto,
  RoleGuard,
  Roles,
  UpdateVacancyDto,
  UserRoleEnum,
} from '../auth/config';
import {
  DeletedDto,
  VacancyDtoDocsOrigin,
  vacancyDtoDocs,
  vacancyTechnologyDtoDocs,
} from 'src/docs';

@ApiBearerAuth()
@ApiTags('Vacancy')
@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}
  @ApiResponse({
    type: vacancyDtoDocs,
    status: 201,
    isArray: true,
    description: 'Get all Successfully.',
  })
  @Get()
  @ApiOperation({
    summary:
      'Search all vacancies with companies, advertisers and related technologies',
  })
  async getAllVacanciesPublic() {
    return await this.vacancyService.getAllVacanciesPublic();
  }
  
  @ApiResponse({
    type: vacancyTechnologyDtoDocs,
    status: 201,
    description: 'Get all Successfully.',
    isArray: true,
  })
  @UseGuards(AuthGuard)
  @Get('vacancies')
  @ApiOperation({
    summary:
      'Search all vacancies with companies, advertisers and related technologies',
  })
  @ApiQuery({
    name: 'tecName',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'vacancyRole',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'level',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'minSalary',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'maxSalary',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'vacancyType',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'location',
    required: false,
    type: String,
  })
  async findAllVacancies(
    @Query('tecName') tecName?: string,
    @Query('vacancyRole') vacancyRole?: string,
    @Query('level') level?: string,
    @Query('minSalary') minSalary?: number,
    @Query('maxSalary') maxSalary?: number,
    @Query('vacancyType') vacancyType?: string,
    @Query('location') location?: string,
  ) {
    return await this.vacancyService.searchVacancies(
      tecName,
      vacancyRole,
      level,
      minSalary,
      maxSalary,
      vacancyType,
      location,
    );
  }

  @ApiBody({
    type: VacancyDtoDocsOrigin,
  })
  @ApiResponse({
    type: vacancyDtoDocs,
    status: 201,
    description: 'Created vacancy Successfully.',
    isArray: true,
  })
  @ApiResponse({
    status: 409,
    description: 'Vacancy already exists.',
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized.',
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.advertiser)
  @Post('create')
  @ApiOperation({
    summary: 'Create a vacancy',
  })
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.createVacancy(createVacancyDto);
  }
  
  @ApiBody({
    type: VacancyDtoDocsOrigin,
  })
  @ApiResponse({
    type: vacancyDtoDocs,
    status: 201,
    description: 'Updated vacancy Successfully.',
    isArray: true,
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 302,
    description: 'Vacancy not exists.',
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin, UserRoleEnum.advertiser)
  @Patch(':id')
  @ApiOperation({
    summary: 'Updated vacancy',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    return this.vacancyService.update(+id, updateVacancyDto);
  }
  
  @ApiResponse({
    type: vacancyTechnologyDtoDocs,
    status: 201,
    description: 'Get vacancy Successfully.',
    isArray: true,
  })
  @ApiResponse({
    status: 302,
    description: 'Vacancy not exists.',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Search for a vacancy by Id',
  })
  async getByVacancyId(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.getVacancyById(id);
  }
  
  @ApiResponse({
    type: DeletedDto,
    description: 'Vacancy deleted with success.',
    isArray: true,
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 302,
    description: 'Vacancy not exists.',
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin, UserRoleEnum.advertiser)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete vacancy',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.delete(id);
  }
}
