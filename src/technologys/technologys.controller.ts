import { Controller, Post, Body } from '@nestjs/common';

import { TechnologysService } from './technologys.service';
import { CreateTechnologyDto } from '../auth/Config/dtos/technologys/create-technology.dto';

@Controller('technologys')
export class TechnologysController {
  constructor(private readonly technologysService: TechnologysService) {}

  @Post()
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologysService.create(createTechnologyDto);
  }
}
