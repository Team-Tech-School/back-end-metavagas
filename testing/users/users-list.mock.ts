import { UserRoleEnum } from '../../src/auth/config/enums/userRoleEnum';

export const usersListMock = [
  {
    id: 1,
    name: 'fabim',
    email: 'example@gmail.com',
    password: '1234',
    role: UserRoleEnum.admin,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    name: 'hamilton',
    email: 'hamilton@gmail.com',
    password: '1234',
    role: UserRoleEnum.advertiser,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    vacancy: [],
  },
  {
    id: 3,
    name: 'anderson',
    email: 'and@gmail.com',
    password: '1234',
    role: UserRoleEnum.candidate,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
