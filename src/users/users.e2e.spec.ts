import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from './users.module';
import { authGuardMock, userRepositoryMock } from '../../testing';
import { AuthGuard } from '../auth/config/guards/auth.guard';
import { RoleGuard } from '../auth/config';

describe('Users e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(userRepositoryMock.provide)
      .useValue(userRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RoleGuard)
      .useValue(authGuardMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Read', () => {
    it('Should return an users profile', async () => {
      const response = await request(app.getHttpServer()).get('/user/profile');

      expect(response.status).toEqual(200);
    });

    it('Should return a user', async () => {
      const response = await request(app.getHttpServer()).get('/user/1');

      expect(response.status).toEqual(202);
    });

    it('Should return a list of users', async () => {
      const response = await request(app.getHttpServer()).get('/user');

      expect(response.status).toEqual(200);
    });
  });
});
