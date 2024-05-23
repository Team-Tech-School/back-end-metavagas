import { Test } from '@nestjs/testing';
import { UsersService } from './user.service';
import { createUserMock } from '../../testing';
import { userMock } from '../../testing';
import { userRepositoryMock } from '../../testing';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      // act
      const user = await userService.create(createUserMock);

      // assert
      expect(user).toEqual(userMock);
    });
  });

  describe('isEmailExists', () => {
    it('should return false when email doesnt exist', async () => {
      // act
      const user = await userService.IsEmailExists(createUserMock.email);

      // assert
      expect(user).toEqual(true);
    });
  });

  describe('profile', () => {
    it("should return a users' profile", async () => {
      // act
      const profile = await userService.profile(userMock.id);

      // assert
      expect(profile).toEqual(userMock);
    });
  });
  describe('getUserBy', () => {
    it('should return a user', async () => {
      // act
      const user = await userService.getUserBy(userMock.email);

      // assert
      expect(user).toEqual(userMock);
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      // act
      const user = await userService.getUserById(userMock.id);

      // assert
      expect(user).toEqual(userMock);
    });
  });

  describe('updateUserById', () => {
    it('should update a user', async () => {
      // act
      const user = await userService.updateUserById(
        userMock.id,
        createUserMock,
      );

      // assert
      expect(user).toEqual(userMock);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      // act
      const user = await userService.delete(userMock.id);

      // assert
      expect(user).toEqual({ response: 'User deleted with success.' });
    });
  });

  describe('listUsers', () => {
    it('should list all users', async () => {
      // act
      const user = await userService.listUsers();

      // assert
      expect(user).toEqual([userMock]);
    });
  });
});
