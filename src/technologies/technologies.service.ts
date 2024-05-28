import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTechnologyDto } from '../auth/config';
import { Technology } from '../database/entities';

@Injectable()
export class TechnologysService {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  async create(payload: CreateTechnologyDto) {
    try {
      const newTechnology = this.technologyRepository.create(payload);

      await this.technologyRepository.save(newTechnology);

      return newTechnology;
    } catch (error) {
      throw new BadRequestException(
        `A technology with this name: ${payload.tecName} already exists.`,
      );
    }
  }

  async findAll() {
    try {
      return await this.technologyRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getByName(tecName: string): Promise<boolean> {
    const getBytecName = await this.technologyRepository.findOne({
      where: { tecName },
      relations: { vacancies: true },
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

  async getTecnologies(tecName: string): Promise<Technology[]> {
    const tecArray = tecName.split('&').map((name) => name.trim());
    const tech = await this.technologyRepository.find();
    const resultados = tech.filter((tec) =>
      tecArray.some(
        (tecName) => tec.tecName.toLowerCase() === tecName.toLowerCase(),
      ),
    );
    console.log(resultados);
    return resultados;
  }

  // async getTecnologies(tecNames: string[]): Promise<Technology[]> {
  //   const tech = await this.technologyRepository.find();
  //   const resultados = tech.filter((tec) =>
  //     tecNames.some((name) =>
  //       tec.tecName.toLowerCase().includes(name.toLowerCase()),
  //     ),
  //   );
  //   return resultados;
  // }

  // async getTecnologies(tecName: string | string[]): Promise<Technology[]> {
  //   // Converter para array se for uma string
  //   const tecArray = Array.isArray(tecName)
  //     ? tecName
  //     : tecName.split(',').map((name) => name.trim());

  //   const tech = await this.technologyRepository.find();
  //   const resultados = tech.filter((tec) =>
  //     tecArray.some((name) => tec.tecName.toLowerCase() === name.toLowerCase()),
  //   );
  //   console.log(resultados);

  //   return resultados;
  // }
}
