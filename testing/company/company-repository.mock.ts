import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from '../../src/database/entities';
import { CreateCompanyMock } from './create-company.mock';
import { CompanyMock } from './company.mock';

export const companyRepositoryMock = {
  provide: getRepositoryToken(Company),
  useValue: {
    create: jest.fn().mockResolvedValue(CompanyMock),
    save: jest.fn().mockResolvedValue(CompanyMock),
    findOne: jest.fn().mockResolvedValue(CompanyMock),
    findOneOrFail: jest.fn().mockResolvedValue(CompanyMock),
    find: jest.fn().mockResolvedValue(CompanyMock),
    update: jest.fn().mockResolvedValueOnce(CompanyMock),
  },
};
