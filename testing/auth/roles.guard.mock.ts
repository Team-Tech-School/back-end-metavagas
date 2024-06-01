import { ExecutionContext } from '@nestjs/common';

export const rolesGuardMock = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = { roles: ['admin'] }; // Simulando um usuário administrador
    return true;
  }),
};
