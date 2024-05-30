import { TechnologysService } from '../../src/technologies/technologies.service';
import { technologyMock } from '../../testing';

export const tecnologyServiceMock = {
  provide: TechnologysService,
  useValue: {
    create: jest.fn().mockReturnValue(technologyMock),
    findAll: jest.fn().mockResolvedValue([technologyMock]),
    getByName: jest.fn().mockResolvedValue(true),
    getTechnologyById: jest.fn().mockReturnValue(technologyMock),
    updateTechnologyById: jest.fn().mockResolvedValue(technologyMock),
    delete: jest
      .fn()
      .mockResolvedValue({ response: 'User deleted with success.' }),
    getTecnologies: jest.fn().mockResolvedValue(technologyMock),
  },
};
