import { applyDecorators } from '@nestjs/common';
import { CreateUserDoc, UserCreatedDoc } from '../dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiUpdateUserDocs() {
  return applyDecorators(
    ApiBody({
      type: CreateUserDoc,
    }),
    ApiResponse({
      type: UserCreatedDoc,
      status: 201,
      isArray: true,
      description: 'User successfully updated.',
    }),
    ApiResponse({
      status: 409,
      description: 'User not exists.',
    }),
    ApiResponse({
      status: 403,
      description: 'Unauthorized.',
    }),
    ApiOperation({
      summary: 'Update user data',
    }),
  );
}
