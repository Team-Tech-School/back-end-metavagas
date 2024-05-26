import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyDtoDoc, CreateCompanyDtoDocs } from '../dto';

export function ApiUpdateCompanyDocs() {
  return applyDecorators(
    ApiBody({
      type: CreateCompanyDtoDocs,
    }),
    ApiResponse({
      type: CompanyDtoDoc,
      status: 200,
      description: 'Successfully Update Company.',
    }),
    ApiResponse({
      status: 403,
      description: 'Unauthorized.',
    }),
    ApiResponse({
      status: 302,
      description: 'Company not exists.',
    }),
    ApiOperation({
      summary: "Authenticate a company's data",
    }),
  );
}
