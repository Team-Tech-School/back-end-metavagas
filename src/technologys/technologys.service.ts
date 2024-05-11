import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      await this.getByName(payload.tecName);
      try {
        const newTechnology = this.technologyRepository.create(payload);

        await this.technologyRepository.save(newTechnology);

        return newTechnology;
      } catch (err) {
        throw new BadRequestException(
          `The technology of the name: ${payload.tecName} already exists.`,
        );
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.BAD_REQUEST,
      );
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

  async getByName(tecName: string): Promise<boolean> {
    const getBytecName = await this.technologyRepository.findOne({
      where: { tecName },
    });
    if (getBytecName) {
      return true;
    } else {
      return false;
    }
  }

  async getTechnologyById(id: number) {
    try {
      const technology = await this.technologyRepository.findOne({
        where: { id },
      });
      if (!technology) {
        throw new NotFoundException(`technology not located.`);
      }
      return technology;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateTechnologyById(
    technologyId: number,
    data: Partial<Technology>,
  ): Promise<Technology> {
    try {
      await this.getTechnologyById(technologyId);

      await this.technologyRepository.update(technologyId, data);

      return await this.getTechnologyById(technologyId);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
  async delete(id: number) {
    try {
      await this.getTechnologyById(id);

      await this.technologyRepository.softDelete(id);

      return { response: 'Technology deleted with success.' };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
