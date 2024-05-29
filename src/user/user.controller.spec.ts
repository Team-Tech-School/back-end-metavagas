import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import {
  userRepositoryMock,
  authGuardMock,
  createUserMock,
  userMock,
  currentUserMock,
} from '../../testing';
import { AuthGuard } from '../auth/config/guards/auth.guard';
import { CurrentUserDto } from 'src/auth/config';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, userRepositoryMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('Should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Update', () => {
    it('Should update a user', async () => {
      const result = await usersController.updateUser(1, createUserMock);

      expect(result).toHaveProperty('id');
    });
  });

  describe('List', () => {
    it('Should return an array of users', async () => {
      const result = await usersController.list();

      expect(result).toEqual([userMock]);
    });
  });

  describe('Profile', () => {
    it('Should return a user', async () => {
      const result = await usersController.profile(currentUserMock);

      expect(result).toEqual(userMock);
    });
  });

  describe('List one user', () => {
    it('Should return a user', async () => {
      const result = await usersController.show(1);

      expect(result).toEqual(userMock);
    });
  });

  describe('Delete one user', () => {
    it('Should delete a user', async () => {
      const result = await usersController.delete(1);

      expect(result).toEqual({ response: 'User deleted successfully.' });
    });
  });
});
