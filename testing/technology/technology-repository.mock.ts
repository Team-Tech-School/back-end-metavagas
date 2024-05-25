import { getRepositoryToken } from '@nestjs/typeorm';
import { Technology } from '../../src/database/entities';

export const mockTechnologyRepository = {
  provide: getRepositoryToken(Technology),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    softDelete: jest.fn(),
    findAndCount: jest.fn(),
    count: jest.fn(),
    findAll: jest.fn().mockResolvedValue([
      [
        {
          id: 1,
          tecName: 'typescript',
          creatorsName: 'Creator 1',
          createAt: new Date('2024-05-25T05:47:00.812Z'),
          updateAt: new Date('2024-05-25T05:47:00.812Z'),
          deleteAt: null,
        },
        { tecName: 'typescript' },
        // Adicione mais tecnologias conforme necessário para o teste
      ],
    ]),
  },
};
