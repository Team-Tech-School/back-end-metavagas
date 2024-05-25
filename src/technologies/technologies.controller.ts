import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TechnologysService } from './technologies.service';
import { Technology } from '../database/entities';
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
import {
  AuthGuard,
  RoleGuard,
  UserRoleEnum,
  Roles,
  CreateTechnologyDto,
} from '../auth/config';
import {
  ApiCreateTechnologyDocs,
  ApiDeleteTechnologyDocs,
  ApiFindAllTechnologyDocs,
  ApiFindOneTechnologyDocs,
  ApiUpdateTechnologyDocs,
} from 'src/docs';

@ApiBearerAuth()
@ApiTags('Technologies')
@Controller('technology')
@UseGuards(AuthGuard)
export class TechnologyController {
  constructor(private technologyService: TechnologysService) {}
  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreateTechnologyDocs()
  @Post()
  async create(@Body() payload: CreateTechnologyDto) {
    return await this.technologyService.create(payload);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiFindAllTechnologyDocs()
  @Get()
  async findAll() {
    return await this.technologyService.findAll();
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiFindOneTechnologyDocs()
  @Get(':id')
  async getByTechnologyId(@Param('id', ParseIntPipe) id: number) {
    return await this.technologyService.getTechnologyById(id);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiUpdateTechnologyDocs()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: Partial<Technology>,
  ) {
    return this.technologyService.updateTechnologyById(+id, updateVacancyDto);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiDeleteTechnologyDocs()
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.technologyService.delete(id);
  }
}
