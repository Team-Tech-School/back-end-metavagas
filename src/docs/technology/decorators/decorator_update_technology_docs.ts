import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TechnologyDtoDocs, TechnologyExtendsDtoDocs } from '../dto';

export function ApiUpdateTechnologyDocs() {
  return applyDecorators(
    ApiBody({
      type: TechnologyDtoDocs,
    }),
    ApiResponse({
      type: TechnologyExtendsDtoDocs,
      status: 201,
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
      summary: "Updating a technology's data",
    }),
  );
}
