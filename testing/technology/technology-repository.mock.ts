import { getRepositoryToken } from '@nestjs/typeorm';
import { Technology } from '../../src/database/entities';
import { technologyMock } from '../../testing';

export const technologyRepositoryMock = {
  provide: getRepositoryToken(Technology),
  useValue: {
    create: jest.fn().mockReturnValue(technologyMock),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue([technologyMock]),
    findOne: jest.fn().mockResolvedValue(technologyMock),
    update: jest.fn(),
    softDelete: jest.fn(),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        tecName: 'typescript',
        creatorsName: 'Creator 1',
        createAt: new Date('2024-05-25T05:47:00.812Z'),
        updateAt: new Date('2024-05-25T05:47:00.812Z'),
        deleteAt: null,
      },
      { tecName: 'typescript' },
    ]),
  },
};
