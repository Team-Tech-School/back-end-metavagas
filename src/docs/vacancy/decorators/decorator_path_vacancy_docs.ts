import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VacancyDtoDocsOrigin, vacancyDtoDocs } from '../dto';

export function ApiPathVacanciesDocs() {
  return applyDecorators(
    ApiBody({
      type: VacancyDtoDocsOrigin,
    }),
    ApiResponse({
      type: vacancyDtoDocs,
      status: 200,
      description: 'Updated vacancy Successfully.',
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
      summary: 'Updated vacancy',
    }),
  );
}
