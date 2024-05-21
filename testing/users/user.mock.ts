import { UserRoleEnum } from '../../src/auth/config';

export const userMock = {
  id: 1,
  name: 'fabim',
  email: 'example@gmail.com',
  role: UserRoleEnum.admin,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
