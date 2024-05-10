import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTechnologyDto } from '../auth/Config/dtos/technologys/create-technology.dto';
import { Technology } from 'src/Database/entities';

@Injectable()
export class TechnologysService {
  constructor(
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {}

  async create(payload: CreateTechnologyDto) {
    try {
      const newTechnology = this.technologyRepository.create(payload);

      await this.technologyRepository.save(newTechnology);

      return newTechnology;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.technologyRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
