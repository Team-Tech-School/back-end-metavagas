import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';

import { TechnologysService } from './technologys.service';
import { CreateTechnologyDto } from '../auth/Config/dtos';
import { Roles } from 'src/auth/Config/decorators/roles.decorator';
import { AuthGuard, RoleGuard, UserRoleEnum } from 'src/auth/Config';

@Controller('technologys')
export class TechnologysController {
  constructor(private readonly technologysService: TechnologysService) {}

  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(UserRoleEnum.admin)
  // @HttpCode(HttpStatus.ACCEPTED)
  @Post('/create')
  async create(@Body() payload: CreateTechnologyDto) {
    return await this.technologysService.create(payload);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get()
  async findAll() {
    return await this.technologysService.findAll();
  }
}
