import { VacancyService } from '../../src/vacancies/vacancies.service';
import {
  CompanyMock,
  VacancyMock,
  userMock,
  vacanciesListMock,
} from '../../testing';

export const vacancyServiceMock = {
  provide: VacancyService,
  useValue: {
    create: jest.fn().mockReturnValue(VacancyMock as any),
    update: jest.fn().mockResolvedValue(VacancyMock),
    findAll: jest.fn().mockResolvedValue(vacanciesListMock),
    idPicker: jest.fn().mockResolvedValue(CompanyMock as any),
    searchVacancies: jest.fn().mockResolvedValue(vacanciesListMock),
    getVacancyRelations: jest.fn().mockResolvedValue(VacancyMock),
    getVacancyById: jest.fn().mockResolvedValue(VacancyMock as any),
    getUserById: jest.fn().mockResolvedValue(userMock as any),
    delete: jest.fn().mockResolvedValue(VacancyMock),
    vacancyExists: jest.fn().mockResolvedValue(true),
  },
};
