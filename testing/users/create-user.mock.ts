import { UserRoleEnum } from '../../src/auth/config/enums/user.roleEnum';

export const createUserMock = {
  name: 'fabin',
  email: 'example@gmail.com',
  password: '1234',
  role: UserRoleEnum.admin,
};
