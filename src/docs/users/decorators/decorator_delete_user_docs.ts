import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeletedDto } from '../dto';

export function ApiDeleteUserDocs() {
  return applyDecorators(
    ApiResponse({
      type: DeletedDto,
      description: 'User deleted with success.',
      isArray: true,
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
      summary: 'Delete a user',
    }),
  );
}
