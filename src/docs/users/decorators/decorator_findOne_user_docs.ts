import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserCreatedDoc } from '../dto';

export function ApiFindOneUserDocs() {
  return applyDecorators(
    ApiResponse({
      type: UserCreatedDoc,
      isArray: true,
      status: 201,
      description: 'Acessed successfully.',
    }),
    ApiResponse({
      status: 403,
      description: 'Unauthorized.',
    }),
    ApiResponse({
      status: 302,
      description: 'User not exists.',
    }),
    ApiOperation({
      summary: 'Search for a user by id',
    }),
  );
}
