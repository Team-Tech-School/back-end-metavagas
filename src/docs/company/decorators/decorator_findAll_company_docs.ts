import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyDtoDoc } from '../dto';

export function ApiFindAllCompanyDocs() {
  return applyDecorators(
    ApiResponse({
      type: CompanyDtoDoc,
      status: 201,
      description: 'Get All Companies.',
    }),
    ApiOperation({
      summary: 'Search for all companies and their linked vacancies',
    }),
  );
}
