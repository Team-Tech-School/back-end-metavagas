import { getRepositoryToken } from '@nestjs/typeorm';
import { Vacancy } from '../../src/database/entities';
import { VacancyMock } from './vacancy.mock';
import { vacanciesListMock } from '../../testing';

export const vacancyRepositoryMock = {
  provide: getRepositoryToken(Vacancy),
  useValue: {
    create: jest.fn().mockResolvedValue(VacancyMock),
    save: jest.fn().mockResolvedValue(VacancyMock),
    findOne: jest.fn().mockResolvedValue(VacancyMock),
    exists: jest.fn().mockResolvedValue(false),
    createQueryBuilder: jest.fn().mockReturnValue({
      orderBy: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue(vacanciesListMock),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      query: jest.fn().mockReturnValue(vacanciesListMock),
      getOne: jest.fn().mockResolvedValue({
        company: {},
        advertiser: {},
      }),
    }),
    findOneOrFail: jest.fn().mockResolvedValue(VacancyMock),
    find: jest.fn().mockResolvedValue(VacancyMock),
    update: jest.fn().mockResolvedValue({ affected: 1 } as any),
    delete: jest.fn(),
    softDelete: jest
      .fn()
      .mockResolvedValueOnce({ response: 'Vacancy deleted with success.' }),
    findAndCount: jest.fn().mockResolvedValueOnce(VacancyMock),
    count: jest.fn().mockResolvedValueOnce(VacancyMock),
  },
};
