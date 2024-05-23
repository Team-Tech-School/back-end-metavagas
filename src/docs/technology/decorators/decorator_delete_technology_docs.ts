import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeletedDto } from 'src/docs';

export function ApiDeleteTechnologyDocs() {
  return applyDecorators(
    ApiResponse({
      type: DeletedDto,
      status: 202,
      description: 'Technology deleted with success.',
      isArray: true,
    }),
    ApiResponse({
      status: 403,
      description: 'Unauthorized.',
    }),
    ApiResponse({
      status: 302,
      description: 'Technology not exists.',
    }),
    ApiOperation({
      summary: 'Delete a technology',
    }),
  );
}
