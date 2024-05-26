import { applyDecorators } from '@nestjs/common';
import { UserCreatedDoc } from '../dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiProfileUserDocs() {
  return applyDecorators(
    ApiResponse({
      type: UserCreatedDoc,
      isArray: true,
      status: 200,
      description: 'Acessed successfully.',
    }),
    ApiOperation({
      summary: 'Fetch profile data',
    }),
  );
}
