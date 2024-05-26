import { CompanyService } from '../../src/companies/companies.service';
import { CompanyMock } from './company.mock';

export const companyServiceMock = {
  provide: CompanyService,
  useValue: {
    create: jest.fn().mockResolvedValue(CompanyMock),
    update: jest.fn().mockResolvedValue(CompanyMock),
    findAll: jest.fn().mockResolvedValue(CompanyMock),
    idPicker: jest.fn().mockResolvedValue(CompanyMock),
  },
};
