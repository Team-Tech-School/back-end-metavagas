import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  usersServiceMock,
  jwtServiceMock,
  createUserMock,
  loginMock,
} from '../../testing';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, usersServiceMock, jwtServiceMock],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('Register', () => {
    it('Should register a new user', async () => {
      const result = await authController.register(createUserMock);

      expect(result).toHaveProperty('id');
    });
  });

  describe('Login', () => {
    it('Should login a user', async () => {
      const result = { accessToken: 'mockJwtToken' };
      jest.spyOn(authService, 'login').mockImplementation(async () => result);

      const login = await authController.login(loginMock);

      expect(login).toBe(result);
    });
  });
});
