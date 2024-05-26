import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserCreatedDoc } from '../dto';

export function ApiFindAllUserDocs() {
  return applyDecorators(
    ApiResponse({
      type: UserCreatedDoc,
      status: 200,
      description: 'Acessed successfully.',
      isArray: true,
    }),
    ApiResponse({
      status: 403,
      description: 'Unauthorized.',
    }),
    ApiOperation({
      summary: 'Find All Users',
    }),
  );
}
