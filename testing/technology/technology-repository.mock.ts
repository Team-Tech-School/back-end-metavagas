import { getRepositoryToken } from '@nestjs/typeorm';
import { Technology } from '../../src/database/entities';

export const technologyRepositoryMock = {
  provide: getRepositoryToken(Technology),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        tecName: 'typescript',
        creatorsName: 'Creator 1',
        createAt: new Date('2024-05-25T05:47:00.812Z'),
        updateAt: new Date('2024-05-25T05:47:00.812Z'),
        deleteAt: null,
      },
    ]),
    findOne: jest.fn(),
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
    ]),
  },
};
