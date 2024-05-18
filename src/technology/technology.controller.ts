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
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TechnologysService } from './technology.service';
import { CreateTechnologyDto } from '../auth/config/dtos';
import { Roles } from '../auth/config/decorators/roles.decorator';
import { AuthGuard, RoleGuard, UserRoleEnum } from '../auth/config';
import { Technology } from '../database/entities';
import {
  DeletedDto,
  TechnologyDtoDocs,
  TechnologyExtendsDtoDocs,
} from 'src/docs';

@ApiBearerAuth()
@ApiTags('Technology')
@Controller('technology')
@UseGuards(AuthGuard)
export class TechnologyController {
  constructor(private technologyService: TechnologysService) {}
  @ApiBody({
    type: TechnologyDtoDocs,
  })
  @ApiResponse({
    type: TechnologyExtendsDtoDocs,
    status: 201,
    description: 'Successfully Created Technology.',
    isArray: true,
  })
  @ApiResponse({
    status: 409,
    description: 'Technology already exists.',
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized.',
  })
  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  @ApiOperation({
    summary: 'Create a technology',
  })
  async create(@Body() payload: CreateTechnologyDto) {
    return await this.technologyService.create(payload);
  }

  @ApiResponse({
    type: TechnologyExtendsDtoDocs,
    status: 201,
    description: 'Get a technology with success.',
    isArray: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Get()
  @ApiOperation({
    summary: 'Find all technologies',
  })
  async findAll() {
    return await this.technologyService.findAll();
  }

  @ApiResponse({
    type: TechnologyExtendsDtoDocs,
    status: 201,
    isArray: true,
  })
  @ApiResponse({
    type: CreateTechnologyDto,
  })
  @ApiResponse({
    status: 302,
    description: 'Technology not exists.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Get(':id')
  @ApiOperation({
    summary: 'Search for a technology by id',
  })
  async getByTechnologyId(@Param('id', ParseIntPipe) id: number) {
    return await this.technologyService.getTechnologyById(id);
  }

  @ApiBody({
    type: TechnologyDtoDocs,
  })
  @ApiResponse({
    type: TechnologyExtendsDtoDocs,
    status: 201,
    isArray: true,
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 302,
    description: 'Technology not exists.',
  })
  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  @ApiOperation({
    summary: "Updating a technology's data",
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: Partial<Technology>,
  ) {
    return this.technologyService.updateTechnologyById(+id, updateVacancyDto);
  }

  @ApiResponse({
    type: DeletedDto,
    status: 202,
    description: 'Technology deleted with success.',
    isArray: true,
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 302,
    description: 'Technology not exists.',
  })
  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a technology',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.technologyService.delete(id);
  }
}
