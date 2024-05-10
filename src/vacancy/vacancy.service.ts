import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from 'src/Database/entities';
import { CreateVacancyDto, UpdateVacancyDto } from 'src/auth/Config';
import { CompanyService } from 'src/companys/company.service';
import { UsersService } from 'src/users';
import { Repository } from 'typeorm';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepository: Repository<Vacancy>,
    private readonly companyService: CompanyService,
    private readonly advertiserService: UsersService,
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
      } catch (e) {
        throw new BadRequestException(
          `A company with this id: ${data.companyId} does not exist.`,
        );
      }

      try {
        await this.advertiserService.getUserById(+data.advertiserId);
      } catch (e) {
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

  async findAllList() {
    try {
      return await this.vacancyRepository.find();
    } catch (err) {
      console.log(err);

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
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
  // findOne(id: number) {
  //   return `This action returns a #${id} vacancy`;
  // }

  // update(id: number, updateVacancyDto: UpdateVacancyDto) {
  //   return `This action updates a #${id} vacancy`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} vacancy`;
  // }
}
