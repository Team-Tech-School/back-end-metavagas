import { getRepositoryToken } from '@nestjs/typeorm';
import { Technology } from '../../src/database/entities';
import { technologyMock } from '../../testing';

export const technologyRepositoryMock = {
  provide: getRepositoryToken(Technology),
  useValue: {
    create: jest.fn().mockResolvedValue(technologyMock),
    save: jest.fn(),
    find: jest.fn().mockReturnValue([
      {
        id: 1,
        tecName: 'Typescript',
        creatorsName: 'Creator 1',
        createAt: new Date('2024-05-25T05:47:00.812Z'),
        updateAt: new Date('2024-05-25T05:47:00.812Z'),
        deleteAt: null,
      },
    ]),
    findOne: jest.fn().mockReturnValue({
      id: 1,
      tecName: 'Typescript',
      creatorsName: 'Creator 1',
      createAt: new Date('2024-05-25T05:47:00.812Z'),
      updateAt: new Date('2024-05-25T05:47:00.812Z'),
      deleteAt: null,
    }),
    update: jest.fn(),
    softDelete: jest.fn(),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        tecName: 'Typescript',
        creatorsName: 'Creator 1',
        createAt: new Date('2024-05-25T05:47:00.812Z'),
        updateAt: new Date('2024-05-25T05:47:00.812Z'),
        deleteAt: null,
      },
    ]),
  },
};
