import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
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
  AuthGuard,
  CreateCompanyDto,
  RoleGuard,
  UserRoleEnum,
  Roles,
  UpdateCompanyDto,
} from '../auth/config';
import {
  ApiCreateCompanyDocs,
  ApiFindAllCompanyDocs,
  ApiFindOneCompanyDocs,
  ApiUpdateCompanyDocs,
} from '../docs';

@ApiBearerAuth()
@ApiTags('Company')
@Controller('company')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreateCompanyDocs()
  @Post()
  async create(@Body() payload: CreateCompanyDto) {
    return await this.companyService.create(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiUpdateCompanyDocs()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCompanyDto,
  ) {
    return await this.companyService.update(id, payload);
  }

  @ApiFindAllCompanyDocs()
  @Get()
  async findAll(@Query('name') name?: string) {
    return await this.companyService.findAll(name);
  }

  @ApiFindOneCompanyDocs()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.idPicker(id);
  }
}
