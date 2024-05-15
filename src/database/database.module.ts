import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';



import TypeOrmConfigOptions from './database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(TypeOrmConfigOptions)],
})
export class DatabaseModule {}
