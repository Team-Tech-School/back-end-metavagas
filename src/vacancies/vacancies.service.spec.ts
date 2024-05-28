import { Test } from '@nestjs/testing';
import { VacancyService } from './vacancies.service';
import {
  CreateVacancyMock,
  VacancyMock,
  companyServiceMock,
  mockTechnologyRepository,
  usersServiceMock,
  vacanciesListMock,
  vacancyRepositoryMock,
} from '../../testing';
import { TechnologysService } from '../technologies/technologies.service';

describe('VacancyService', () => {
  let service: VacancyService;
  let technologyService: TechnologysService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        VacancyService,
        TechnologysService,
        vacancyRepositoryMock,
        companyServiceMock,
        usersServiceMock,
        mockTechnologyRepository,
      ],
    }).compile();

    service = module.get<VacancyService>(VacancyService);

    technologyService = module.get<TechnologysService>(TechnologysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('vacancyExists', () => {
    it('should return true if the vacancy exists', async () => {
      const vacancyRole = CreateVacancyMock.vacancyRole;

      const exists = await service.vacancyExists(vacancyRole);

      expect(exists).toBe(false);
    });

    it('should return false if the vacancy does not exist', async () => {
      const vacancyRole = CreateVacancyMock.vacancyRole;

      const exists = await service.vacancyExists(vacancyRole);

      expect(exists).toBe(false);
    });
  });

  describe('create', () => {
    it('should create a new vacancy', async () => {
      const newVacancy = await service.createVacancy(CreateVacancyMock);

      expect(newVacancy).toHaveProperty('id');
    });
  });

  describe('getVacancyRelations', () => {
    it('should return a vacancy', async () => {
      // act
      const vacancy = await service.getVacanciesRelations(1);

      // assert
      expect(vacancy).toEqual(VacancyMock);
    });
  });

  describe('getVacancyById', () => {
    it('should return a vacancy', async () => {
      // act
      const vacancy = await service.getVacancyById(1);

      // assert
      expect(vacancy).toEqual(VacancyMock);
    });
  });

  describe('update', () => {
    it('should update a vacancy', async () => {
      // act
      const updatedVacancy = await service.update(1, CreateVacancyMock);

      // assert
      expect(updatedVacancy).toEqual(VacancyMock);
    });
  });

  describe('delete', () => {
    it('should delete a vacancy', async () => {
      // act
      const vacancy = await service.delete(1);

      // assert
      expect(vacancy).toEqual({ response: 'Vacancy deleted with success.' });
    });
  });

  describe('searchVacancies', () => {
    it('should list all vacancies', async () => {
      // act
      const vacancies = await service.searchVacancies();

      // assert
      expect(vacancies).toEqual(vacanciesListMock);
    });
  });
});
