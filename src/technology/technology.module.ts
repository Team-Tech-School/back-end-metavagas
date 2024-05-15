import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { TechnologysService } from './technology.service';
import { TechnologyController } from './technology.controller';
import { Technology } from 'src/database/entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  controllers: [TechnologyController],
  providers: [TechnologysService],
  exports: [TechnologysService],
})
export class TechnologysModule {}
