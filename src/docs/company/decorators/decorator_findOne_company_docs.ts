import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyDtoDoc } from '../dto';

export function ApiFindOneCompanyDocs() {
  return applyDecorators(
    ApiResponse({
      type: CompanyDtoDoc,
      status: 200,
      description: 'Get Company by ID.',
    }),
    ApiResponse({
      status: 302,
      description: 'Company not exists.',
    }),
    ApiOperation({
      summary: 'Search for a company by Id',
    }),
  );
}
