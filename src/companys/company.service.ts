import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCompanyDto } from '../Docs/companys/create-company.dto';
import { Company } from 'src/Database/entities';
import { UpdateCompanyDto } from 'src/Docs';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(payload: CreateCompanyDto) {
    try {
      const newCompany = this.companyRepository.create(payload);

      await this.companyRepository.save(newCompany);

      return newCompany;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, payload: UpdateCompanyDto) {
    await this.idPicker(id);

    await this.companyRepository.update(id, payload);

    return await this.idPicker(id);
  }

  async idPicker(id: number) {
    try {
      const company = await this.companyRepository.findOne({ where: { id } });

      if (!company) {
        throw new NotFoundException(`An user with this id:${id} not found`);
      }

      return company;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
