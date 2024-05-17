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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';
import {
  AuthGuard,
  CreateCompanyDto,
  RoleGuard,
  UserRoleEnum,
} from '../auth/config';
import { Roles } from '../auth/config/decorators/roles.decorator';
import { CreateCompanyDtoDocs } from '../docs';
import { UpdateCompanyDto } from '../auth/config';
import { CompanyDtoDoc } from 'src/docs/company/company-dto-Docs';

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
  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
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
  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
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
  async findAll(@Query('name') name?: string) {
    return await this.companyService.findAll(name);
  }
  @ApiResponse({
    type: CompanyDtoDoc,
    status: 201,
    description: 'Get Company by ID.',
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.idPicker(id);
  }
}
