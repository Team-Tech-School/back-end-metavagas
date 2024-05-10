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
import { ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';
import { CreateCompanyDto } from '../Docs/companys/create-company.dto';
import { AuthGuard, RoleGuard, UserRoleEnum } from 'src/auth/Config';
import { Roles } from 'src/auth/Config/decorators/roles.decorator';
import { UpdateCompanyDto } from 'src/Docs';

@ApiTags('Company')
@UseGuards()
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.create(createCompanyDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCompanyDto,
  ) {
    return await this.companyService.update(id, payload);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get()
  async findAll(@Query('name') name?: string) {
    return await this.companyService.findAll(name);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.idPicker(id);
  }
}
