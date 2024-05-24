/* eslint-disable prefer-const */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Technology, Vacancy } from '../database/entities';
import { CreateVacancyDto } from '../auth/config';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../user';
import { TechnologysService } from '../technology/technology.service';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepository: Repository<Vacancy>,
    private readonly companyService: CompanyService,
    private readonly advertiserService: UsersService,
    private readonly technologyService: TechnologysService,
  ) {}

  async createVacancy(data: CreateVacancyDto) {
    try {
      if (await this.vacancyExists(data.vacancyRole)) {
        throw new BadRequestException(
          `A vacancy with this name: ${data.vacancyRole} already exists.`,
        );
      }

      try {
        await this.companyService.idPicker(+data.companyId);
      } catch (error) {
        throw new BadRequestException(
          `A company with this id: ${data.companyId} does not exist.`,
        );
      }

      try {
        await this.advertiserService.getUserById(+data.advertiserId);
      } catch (error) {
        throw new BadRequestException(
          `ID: ${data.advertiserId} advertiser does not exist.`,
        );
      }

      const newVacancy = this.vacancyRepository.create(data);

      await this.vacancyRepository.save(newVacancy);

      return newVacancy;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async vacancyExists(vacancyRole: string): Promise<boolean> {
    const vacancy = await this.vacancyRepository.exists({
      where: { vacancyRole },
    });

    if (vacancy) {
      return true;
    } else {
      return false;
    }
  }

  async update(id: number, updateVacancyDto) {
    try {
      await this.getVacancyById(+id);

      await this.vacancyRepository.update(id, updateVacancyDto);

      return await this.getVacancyById(+id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getVacancyRelations(id: number): Promise<Vacancy> {
    return await this.vacancyRepository.findOne({
      where: { id },
      select: {
        id: true,
        vacancyRole: true,
        wage: true,
        location: true,
        vacancyType: true,
        vacancyDescription: true,
        level: true,
      },
      relations: ['company', 'advertiser'],
    });
  }
  async getVacancyById(id: number) {
    try {
      const vacancy = await this.getVacancyRelations(id);

      if (!vacancy) {
        throw new NotFoundException(`vacancy not located.`);
      }
      const data = await this.vacancyRepository
        .createQueryBuilder('vacancy')
        .leftJoinAndSelect('vacancy.company', 'company')
        .leftJoinAndSelect('vacancy.advertiser', 'advertiser')
        .getOne();
      return {
        ...vacancy,
        company: data.company.name,
        advertiser: data.advertiser.name,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      await this.getVacancyById(id);

      await this.vacancyRepository.softDelete(id);

      return { response: 'Vacancy deleted with success.' };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async searchVacancies(
    tecName?: string,
    vacancyRole?: string,
    level?: string,
    minSalary?: number,
    maxSalary?: number,
    vacancyType?: string,
    location?: string,
    page?: number,
    limit?: number,
  ): Promise<{
    vacancies: Vacancy[];
    pageSize: number;
    page: number;
    total: number;
  }> {
    const query = this.vacancyRepository
      .createQueryBuilder('vacancy')
      .orderBy('vacancy.createAt', 'DESC')
      .leftJoinAndSelect('vacancy.company', 'company')
      .leftJoinAndSelect('vacancy.advertiser', 'advertiser');

    if (tecName) {
      const lowerTecName = tecName.toLowerCase();
      query.andWhere(
        '(LOWER(vacancy.vacancyRole) LIKE :lowerTecName OR LOWER(vacancy.vacancyDescription) LIKE :lowerTecName)',
        { lowerTecName: `%${lowerTecName}%` },
      );
    }

    if (vacancyRole) {
      query.andWhere('vacancy.vacancyRole ILIKE :vacancyRole', {
        vacancyRole: `%${vacancyRole}%`,
      });
    }

    if (level) {
      query.andWhere('vacancy.level ILIKE :level', {
        level: `%${level}%`,
      });
    }

    if (minSalary) {
      query.andWhere('vacancy.wage >= :minSalary', { minSalary });
    }

    if (maxSalary) {
      query.andWhere('vacancy.wage <= :maxSalary', { maxSalary });
    }

    if (vacancyType) {
      query.andWhere('vacancy.vacancyType LIKE :vacancyType', {
        vacancyType: `%${vacancyType}%`,
      });
    }

    if (location) {
      query.andWhere('vacancy.location ILIKE :location', {
        location: `%${location}%`,
      });
    }

    // Carregar todas as tecnologias
    const technologies = await this.technologyService.findAll();

    // Executar a consulta para obter as vagas

    let [vacancies, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    // Mapear as tecnologias para cada vaga
    vacancies = vacancies.map((vacancy) => {
      const mappedTechnologies: Technology[] = [];
      const lowerVacancyDescription = vacancy.vacancyDescription.toLowerCase();
      const lowerVacancyRole = vacancy.vacancyRole.toLowerCase();

      technologies.forEach((technology) => {
        const lowerTechName = technology.tecName.toLowerCase();
        const regex = new RegExp(`\\b${lowerTechName}\\b`, 'i'); // Cria uma regex para buscar a tecnologia como palavra completa

        if (
          regex.test(lowerVacancyDescription) ||
          regex.test(lowerVacancyRole)
        ) {
          mappedTechnologies.push(technology);
        }
      });

      return { ...vacancy, technologies: mappedTechnologies };
    });

    return {
      vacancies: vacancies,
      page: +page,
      pageSize: +limit,
      total: total,
    };
  }
}
