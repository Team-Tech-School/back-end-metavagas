import { Test, TestingModule } from '@nestjs/testing';

import { CompanyService } from './companies.service';
import {
  CompanyMock,
  CreateCompanyMock,
  companyRepositoryMock,
} from '../../testing';

describe('CompanyService', () => {
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyService, companyRepositoryMock],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
  });

  it('Should be defined', () => {
    expect(companyService).toBeDefined();
  });

  describe('Create', () => {
    it('Should register a new company', async () => {
      const newCompany = await companyService.create(CreateCompanyMock);

      expect(newCompany).toHaveProperty('id');
    });
  });

  describe('Update', () => {
    it('Should update a company', async () => {
      const updatedCompany = await companyService.update(1, CreateCompanyMock);

      expect(updatedCompany).toEqual(CompanyMock);
    });
  });
  describe('Find All', () => {
    it('Should return all companies', async () => {
      const companies = await companyService.findAll();

      expect(companies).toEqual(CompanyMock);
    });
  });

  describe('Find One', () => {
    it('Should return a company', async () => {
      const company = await companyService.idPicker(1);

      expect(company).toEqual(CompanyMock);
    });
  });
});
