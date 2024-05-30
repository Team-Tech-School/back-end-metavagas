import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/database/entities';
import { userMock } from './user.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    exists: jest.fn().mockResolvedValue(false),
    create: jest.fn().mockReturnValue(userMock),
    save: jest.fn(),
    findOne: jest.fn().mockResolvedValue(userMock),
    findOneOrFail: jest.fn().mockResolvedValue(userMock),
    find: jest.fn().mockResolvedValue([userMock]),
    softDelete: jest.fn(),
    update: jest.fn(),
  },
};
