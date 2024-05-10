import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCompanyDto } from '../auth/Config/dtos/companys/create-company.dto';
import { Company } from 'src/Database/entities';
import { UpdateCompanyDto } from '../auth/Config/dtos';

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
    try {
      await this.idPicker(id);

      await this.companyRepository.update(id, payload);

      return await this.idPicker(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(name?: string) {
    try {
      if (name) {
        return await this.companyRepository.find({
          where: { name },
        });
      }

      return await this.companyRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async idPicker(id: number) {
    try {
      const company = await this.companyRepository.findOne({ where: { id } });

      if (!company) {
        throw new NotFoundException(`Not found, try again.`);
      }

      return company;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
