import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TechnologysService } from './technologys.service';
import { TechnologysController } from './technologys.controller';
import { Technology } from 'src/Database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  controllers: [TechnologysController],
  providers: [TechnologysService],
})
export class TechnologysModule {}
