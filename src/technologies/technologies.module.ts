import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TechnologysService } from './technologies.service';
import { TechnologyController } from './technologies.controller';
import { Technology } from '../database/entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  controllers: [TechnologyController],
  providers: [TechnologysService],
  exports: [TechnologysService],
})
export class TechnologysModule {}
