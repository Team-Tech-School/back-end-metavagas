import { Injectable } from '@nestjs/common';

import { CreateTechnologyDto } from '../auth/Config/dtos/technologys/create-technology.dto';

@Injectable()
export class TechnologysService {
  create(createTechnologyDto: CreateTechnologyDto) {
    return 'This action adds a new technology';
  }
}
