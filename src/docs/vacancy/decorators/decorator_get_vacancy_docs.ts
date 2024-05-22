import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { vacancyTechnologyDtoDocs } from '../dto';

export function ApiGetVacanciesDocs() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Search all vacancies with companies, advertisers and related technologies',
    }),
    ApiResponse({
      type: vacancyTechnologyDtoDocs,
      status: 201,
      description: 'Get all Successfully.',
      isArray: true,
    }),
  );
}
