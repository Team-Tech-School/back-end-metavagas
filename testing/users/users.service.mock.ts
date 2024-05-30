import { UsersService } from '../../src/users/users.service';
import { usersListMock } from './users-list.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn().mockReturnValue(usersListMock[0]),
    getUserBy: jest.fn().mockResolvedValue(usersListMock[0]),
    IsEmailExists: jest.fn().mockResolvedValue(true),
    getUserById: jest.fn().mockResolvedValue(usersListMock[0]),
    updateUserById: jest.fn().mockResolvedValue(usersListMock[0]),
    delete: jest
      .fn()
      .mockResolvedValue({ response: 'User deleted with success.' }),
    listUsers: jest.fn().mockResolvedValue(usersListMock),
    profile: jest.fn().mockResolvedValue(usersListMock[0]),
  },
};
