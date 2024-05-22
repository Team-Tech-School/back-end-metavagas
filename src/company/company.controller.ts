import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CompanyService } from './company.service';
import {
  AuthGuard,
  CreateCompanyDto,
  RoleGuard,
  UserRoleEnum,
} from '../auth/config';
import { Roles } from '../auth/config/decorators/roles.decorator';
import { CompanyDtoDoc, CreateCompanyDtoDocs } from '../docs';
import { UpdateCompanyDto } from '../auth/config';

@ApiBearerAuth()
@ApiTags('Company')
@Controller('company')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiBody({
    type: CreateCompanyDtoDocs,
  })
  @ApiResponse({
    type: CompanyDtoDoc,
    status: 201,
    description: 'Successfully Created Company.',
  })
  @ApiResponse({
    status: 409,
    description: 'Company already exists.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  @ApiOperation({
    summary: 'Create a company',
  })
  async create(@Body() payload: CreateCompanyDto) {
    return await this.companyService.create(payload);
  }

  @ApiBody({
    type: CreateCompanyDtoDocs,
  })
  @ApiResponse({
    type: CompanyDtoDoc,
    status: 201,
    description: 'Successfully Update Company.',
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 302,
    description: 'Company not exists.',
  })
  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  @ApiOperation({
    summary: "Authenticate a company's data",
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCompanyDto,
  ) {
    return await this.companyService.update(id, payload);
  }
  @ApiResponse({
    type: CompanyDtoDoc,
    status: 201,
    description: 'Get All Companies.',
  })
  @Get()
  @ApiOperation({
    summary: 'Search for all companies and their linked vacancies',
  })
  async findAll(@Query('name') name?: string) {
    return await this.companyService.findAll(name);
  }
  @ApiResponse({
    type: CompanyDtoDoc,
    status: 201,
    description: 'Get Company by ID.',
  })
  @ApiResponse({
    status: 302,
    description: 'Company not exists.',
  })
  @Get(':id')
  @ApiOperation({
    summary: 'Search for a company by Id',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.idPicker(id);
  }
}
