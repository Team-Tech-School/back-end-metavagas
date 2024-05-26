import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { getIdvacacyDto } from '../dto';

export function ApiGetByIdVacanciesDocs() {
  return applyDecorators(
    ApiResponse({
      type: getIdvacacyDto,
      status: 200,
      description: 'Get vacancy Successfully.',
      isArray: true,
    }),
    ApiResponse({
      status: 302,
      description: 'Vacancy not exists.',
    }),
    ApiOperation({
      summary: 'Search for a vacancy by Id',
    }),
  );
}
