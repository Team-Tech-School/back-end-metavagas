import { UsersService } from '../../src/user/user.service';
import { usersListMock } from './users-list.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn().mockResolvedValue(usersListMock[0]),
    getUserBy: jest.fn().mockResolvedValue(usersListMock[0]),
  },
};
