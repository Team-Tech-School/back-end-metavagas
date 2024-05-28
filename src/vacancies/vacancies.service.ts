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
import { CompanyService } from '../companies/companies.service';
import { UsersService } from '../users';
import { TechnologysService } from '../technologies/technologies.service';

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
      const company = await this.companyService.idPicker(+data.companyId);
      const advertiser = await this.advertiserService.getUserById(
        +data.advertiserId,
      );

      if (!company || !advertiser) {
        throw new Error('Invalid company or advertiser');
      }

      const newVacancy = this.vacancyRepository.create({
        vacancyRole: data.vacancyRole,
        wage: data.wage,
        location: data.location,
        vacancyType: data.vacancyType,
        vacancyDescription: data.vacancyDescription,
        level: data.level,
        company: company,
        advertiser: advertiser,
      });

      await this.vacancyRepository.save(newVacancy);

      return await this.getVacancyById(newVacancy.id);
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

  async getVacancyRelationsName(id: number) {
    const data = await this.getVacanciesRelations(id);

    return {
      id: data.id,
      vacancyRole: data.vacancyRole,
      wage: data.wage,
      location: data.location,
      vacancyType: data.vacancyType,
      vacancyDescription: data.vacancyDescription,
      level: data.level,
      createAt: data.createAt,
      updateAt: data.updateAt,
      deleteAt: data.deleteAt,
      company: data.company.name,
      advertiser: data.advertiser.name,
    };
  }

  async getVacanciesRelations(id: number) {
    try {
      const vacancy = await this.getVacancyById(id);

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
        company: data.company,
        advertiser: data.advertiser,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getVacancyById(id: number) {
    return await this.vacancyRepository.findOne({
      where: { id },
      relations: {
        company: true,
        advertiser: true,
      },
    });
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
    console.log(tecName);

    const query = this.vacancyRepository
      .createQueryBuilder('vacancy')
      .orderBy('vacancy.createAt', 'DESC')
      .leftJoinAndSelect('vacancy.company', 'company')
      .leftJoinAndSelect('vacancy.advertiser', 'advertiser');

    const hasFilters =
      tecName ||
      vacancyRole ||
      level ||
      minSalary ||
      maxSalary ||
      vacancyType ||
      location;

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

    // Obter as tecnologias com base no tecName
    let technologies: Technology[] = [];
    if (tecName) {
      technologies = await this.technologyService.getTecnologies(tecName);
    }

    if (!hasFilters) {
      technologies = await this.technologyService.findAll();
    }

    if (technologies.length > 0) {
      const techFilters = technologies
        .map((technology) => {
          const lowerTecName = technology.tecName.toLowerCase();
          return `(LOWER(vacancy.vacancyRole) LIKE '%${lowerTecName}%' OR LOWER(vacancy.vacancyDescription) LIKE '%${lowerTecName}%')`;
        })
        .join(' OR ');

      query.andWhere(`(${techFilters})`);
    }

    // Executar a consulta para obter as vagas
    let [vacancies, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    // Filtrar vagas para garantir que contenham as tecnologias especificadas
    vacancies = vacancies.filter((vacancy) => {
      const lowerVacancyDescription = vacancy.vacancyDescription.toLowerCase();
      const lowerVacancyRole = vacancy.vacancyRole.toLowerCase();

      return technologies.some((technology) => {
        const lowerTechName = technology.tecName.toLowerCase();
        const regex = new RegExp(`\\b${lowerTechName}\\b`, 'i');
        return (
          regex.test(lowerVacancyDescription) || regex.test(lowerVacancyRole)
        );
      });
    });

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

      return {
        ...vacancy,
        technologies: mappedTechnologies,
      };
    });

    return {
      vacancies: vacancies,
      page: +page,
      pageSize: +limit,
      total: total,
    };
  }

  // async searchVacancies(
  //   tecName?: string | string[], // Pode ser string ou array de strings
  //   vacancyRole?: string,
  //   level?: string,
  //   minSalary?: number,
  //   maxSalary?: number,
  //   vacancyType?: string,
  //   location?: string,
  //   page: number = 1,
  //   limit: number = 10,
  // ): Promise<{
  //   vacancies: Vacancy[];
  //   pageSize: number;
  //   page: number;
  //   total: number;
  // }> {
  //   const query = this.vacancyRepository
  //     .createQueryBuilder('vacancy')
  //     .orderBy('vacancy.createAt', 'DESC')
  //     .leftJoinAndSelect('vacancy.company', 'company')
  //     .leftJoinAndSelect('vacancy.advertiser', 'advertiser');

  // const hasFilters =
  //   tecName ||
  //   vacancyRole ||
  //   level ||
  //   minSalary ||
  //   maxSalary ||
  //   vacancyType ||
  //   location;

  //   if (vacancyRole) {
  //     query.andWhere('vacancy.vacancyRole ILIKE :vacancyRole', {
  //       vacancyRole: `%${vacancyRole}%`,
  //     });
  //   }

  //   if (level) {
  //     query.andWhere('vacancy.level ILIKE :level', {
  //       level: `%${level}%`,
  //     });
  //   }

  //   if (minSalary) {
  //     query.andWhere('vacancy.wage >= :minSalary', { minSalary });
  //   }

  //   if (maxSalary) {
  //     query.andWhere('vacancy.wage <= :maxSalary', { maxSalary });
  //   }

  //   if (vacancyType) {
  //     query.andWhere('vacancy.vacancyType LIKE :vacancyType', {
  //       vacancyType: `%${vacancyType}%`,
  //     });
  //   }

  //   if (location) {
  //     query.andWhere('vacancy.location ILIKE :location', {
  //       location: `%${location}%`,
  //     });
  //   }

  //   // Obter as tecnologias com base no tecName, se fornecido
  //   // Obter as tecnologias com base no tecName, se fornecido
  //   // Obter as tecnologias com base no tecName, se fornecido
  //   let technologies: Technology[] = [];
  //   if (tecName) {
  //     // Garantir que tecName seja um array
  //     const tecNamesArray = Array.isArray(tecName) ? tecName : [tecName];
  //     technologies = await this.technologyService.getTecnologies(tecNamesArray);
  //   }

  //   if (technologies.length > 0) {
  //     const techFilters = technologies
  //       .map((technology) => {
  //         const lowerTecName = technology.tecName.toLowerCase();
  //         return `(LOWER(vacancy.vacancyRole) LIKE '%${lowerTecName}%' OR LOWER(vacancy.vacancyDescription) LIKE '%${lowerTecName}%')`;
  //       })
  //       .join(' OR ');

  //     query.andWhere(`(${techFilters})`);
  //   }

  //   // Executar a consulta para obter as vagas
  //   let [vacancies, total] = await query
  //     .skip((page - 1) * limit)
  //     .take(limit)
  //     .getManyAndCount();

  //   // Se nenhum filtro foi aplicado, carregar todas as tecnologias
  // if (!hasFilters) {
  //   technologies = await this.technologyService.findAll();
  // }

  //   // Mapear as tecnologias para cada vaga
  //   vacancies = vacancies.map((vacancy) => {
  //     const mappedTechnologies: Technology[] = [];
  //     const lowerVacancyDescription = vacancy.vacancyDescription.toLowerCase();
  //     const lowerVacancyRole = vacancy.vacancyRole.toLowerCase();

  //     technologies.forEach((technology) => {
  //       const lowerTechName = technology.tecName.toLowerCase();
  //       const regex = new RegExp(`\\b${lowerTechName}\\b`, 'i'); // Cria uma regex para buscar a tecnologia como palavra completa

  //       if (
  //         regex.test(lowerVacancyDescription) ||
  //         regex.test(lowerVacancyRole)
  //       ) {
  //         mappedTechnologies.push(technology);
  //       }
  //     });

  //     return {
  //       ...vacancy,
  //       technologies: mappedTechnologies,
  //     };
  //   });

  //   return {
  //     vacancies: vacancies,
  //     page: +page,
  //     pageSize: +limit,
  //     total: total,
  //   };
  // }
}
