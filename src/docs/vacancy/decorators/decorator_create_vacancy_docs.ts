import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VacancyDtoDocsOrigin } from '../dto/post-vacancy-dto';
import { vacancyDtoDocs } from '../dto/vacancyExtendsCreateDto';

export function ApiCreateVacanciesDocs() {
  return applyDecorators(
    ApiBody({
      type: VacancyDtoDocsOrigin,
    }),
    ApiResponse({
      type: vacancyDtoDocs,
      status: 201,
      description: 'Created vacancy Successfully.',
      isArray: true,
    }),
    ApiResponse({
      status: 409,
      description: 'Vacancy already exists.',
    }),
    ApiResponse({
      status: 403,
      description: 'Unauthorized.',
    }),
    ApiOperation({
      summary: 'Create a vacancy',
    }),
  );
}
