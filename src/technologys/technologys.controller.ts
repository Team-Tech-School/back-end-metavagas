import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';

import { TechnologysService } from './technologys.service';
import { CreateTechnologyDto } from '../auth/Config/dtos';
import { Roles } from 'src/auth/Config/decorators/roles.decorator';
import { AuthGuard, RoleGuard, UserRoleEnum } from 'src/auth/Config';
import { ApiResponse } from '@nestjs/swagger';
import { Technology } from 'src/Database/entities';

@Controller('technology')
export class TechnologyController {
  constructor(private technologysService: TechnologysService) {}

  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(UserRoleEnum.admin)
  // @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  async create(@Body() payload: CreateTechnologyDto) {
    return await this.technologysService.create(payload);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get()
  async findAll() {
    return await this.technologysService.findAll();
  }

  @ApiResponse({
    type: CreateTechnologyDto,
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Get(':id')
  async getByTechnologyId(@Param('id', ParseIntPipe) id: number) {
    return await this.technologysService.getTechnologyById(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: Partial<Technology>,
  ) {
    return this.technologysService.updateTechnologyById(+id, updateVacancyDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.technologysService.delete(id);
  }
}
