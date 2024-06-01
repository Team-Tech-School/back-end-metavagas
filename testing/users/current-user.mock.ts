import { CurrentUserDto } from '../../src/auth/config';
import { userMock } from './user.mock';

export const currentUserMock: CurrentUserDto = {
  userId: userMock.id,
  email: userMock.email,
};
