import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyDtoDoc, CreateCompanyDtoDocs } from '../dto';

export function ApiCreateCompanyDocs() {
  return applyDecorators(
    ApiBody({
      type: CreateCompanyDtoDocs,
    }),
    ApiResponse({
      type: CompanyDtoDoc,
      status: 200,
      description: 'Successfully Created Company.',
    }),
    ApiResponse({
      status: 409,
      description: 'Company already exists.',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
    }),
    ApiOperation({
      summary: 'Create a company',
    }),
  );
}
