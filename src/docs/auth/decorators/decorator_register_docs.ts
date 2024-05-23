import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDoc, UserCreatedDoc } from 'src/docs/users';

export function ApiRegisterDocs() {
  return applyDecorators(
    ApiBody({ type: CreateUserDoc }),
    ApiResponse({
      type: UserCreatedDoc,
      status: 201,
      isArray: true,
      description: 'User successfully registered.',
    }),
    ApiResponse({
      status: 409,
      description: 'User already exists.',
    }),
    ApiOperation({
      summary: 'User Registration',
    }),
  );
}
