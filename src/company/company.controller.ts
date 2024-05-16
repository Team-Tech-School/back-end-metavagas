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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';
import { RoleGuard, UserRoleEnum } from '../auth/config';
import { Roles } from '../auth/config/decorators/roles.decorator';
import { CreateCompanyDto } from '../auth/config';
import { UpdateCompanyDto } from '../auth/config';

@ApiBearerAuth()
@ApiTags('Company')
@Controller('company')
@UseGuards(RoleGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  async create(@Body() payload: CreateCompanyDto) {
    return await this.companyService.create(payload);
  }

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
  @Get()
  async findAll(@Query('name') name?: string) {
    return await this.companyService.findAll(name);
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.idPicker(id);
  }
}
