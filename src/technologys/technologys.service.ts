import { Injectable } from '@nestjs/common';

import { CreateTechnologyDto } from '../Docs/technologys/create-technology.dto';

@Injectable()
export class TechnologysService {
  create(createTechnologyDto: CreateTechnologyDto) {
    return 'This action adds a new technology';
  }
}
