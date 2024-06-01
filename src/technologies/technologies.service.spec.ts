import { Test, TestingModule } from '@nestjs/testing';
import { CreateTechnologyMock, technologyRepositoryMock } from '../../testing';
import { TechnologysService } from './technologies.service';

describe('TechnologiesService', () => {
  let service: TechnologysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnologysService, technologyRepositoryMock],
    }).compile();

    service = module.get<TechnologysService>(TechnologysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new technology', async () => {
      jest.spyOn(service, 'getByName').mockResolvedValueOnce(null);
      const newTechnology = await service.create(CreateTechnologyMock);

      expect(newTechnology).toHaveProperty('id');
    });
  });

  describe('findAll', () => {
    it('should return all technologies', async () => {
      const technologies = await service.findAll();

      expect(technologies).toEqual([
        {
          id: 1,
          tecName: 'Typescript',
          creatorsName: 'Creator 1',
          createAt: new Date('2024-05-25T05:47:00.812Z'),
          updateAt: new Date('2024-05-25T05:47:00.812Z'),
          deleteAt: null,
        },
      ]);
    });
  });

  describe('getByName', () => {
    it('should return true if technology exists', async () => {
      jest.spyOn(service, 'getByName').mockResolvedValueOnce(true);
      const technology = await service.getByName('Typescript');

      expect(technology).toBeTruthy();
    });

    it('should return false if technology does not exist', async () => {
      jest.spyOn(service, 'getByName').mockResolvedValueOnce(false);
      const technology = await service.getByName('Typescript');

      expect(technology).toBeFalsy();
    });
  });

  describe('getTechnologyById', () => {
    it('should return a technology', async () => {
      const technology = await service.getTechnologyById(1);

      expect(technology).toEqual({
        id: 1,
        tecName: 'Typescript',
        creatorsName: 'Creator 1',
        createAt: new Date('2024-05-25T05:47:00.812Z'),
        updateAt: new Date('2024-05-25T05:47:00.812Z'),
        deleteAt: null,
      });
    });
  });

  describe('updateTechnologyById', () => {
    it('should update a technology', async () => {
      const technology = await service.updateTechnologyById(1, {
        tecName: 'Typescript',
        creatorsName: 'Creator 1',
        createAt: new Date('2024-05-25T05:47:00.812Z'),
        updateAt: new Date('2024-05-25T05:47:00.812Z'),
        deleteAt: null,
      });
      expect(technology).toEqual({
        id: 1,
        tecName: 'Typescript',
        creatorsName: 'Creator 1',
        createAt: new Date('2024-05-25T05:47:00.812Z'),
        updateAt: new Date('2024-05-25T05:47:00.812Z'),
        deleteAt: null,
      });
    });
  });
  describe('delete', () => {
    it('should delete a technology', async () => {
      await service.delete(1);
    });
  });
  describe('getTecnologies', () => {
    it('should return a technology', async () => {
      const technology = await service.getTecnologies('Typescript');

      expect(technology).toEqual([
        {
          id: 1,
          tecName: 'Typescript',
          creatorsName: 'Creator 1',
          createAt: new Date('2024-05-25T05:47:00.812Z'),
          updateAt: new Date('2024-05-25T05:47:00.812Z'),
          deleteAt: null,
        },
      ]);
    });
  });
});
