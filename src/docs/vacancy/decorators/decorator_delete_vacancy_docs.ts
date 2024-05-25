import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeletedDto } from '../../users/dto';

export function ApiDeleteVacanciesDocs() {
  return applyDecorators(
    ApiResponse({
      type: DeletedDto,
      description: 'Vacancy deleted with success.',
      isArray: true,
    }),
    ApiResponse({
      status: 403,
      description: 'Unauthorized.',
    }),
    ApiResponse({
      status: 302,
      description: 'Vacancy not exists.',
    }),
    ApiOperation({
      summary: 'Delete vacancy',
    }),
  );
}
