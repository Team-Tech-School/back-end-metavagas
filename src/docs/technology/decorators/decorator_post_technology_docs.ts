import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TechnologyDtoDocs, TechnologyExtendsDtoDocs } from '../dto';

export function ApiCreateTechnologyDocs() {
  return applyDecorators(
    ApiBody({
      type: TechnologyDtoDocs,
    }),
    ApiResponse({
      type: TechnologyExtendsDtoDocs,
      status: 201,
      description: 'Successfully Created Technology.',
      isArray: true,
    }),
    ApiResponse({
      status: 409,
      description: 'Technology already exists.',
    }),
    ApiResponse({
      status: 403,
      description: 'Unauthorized.',
    }),
    ApiOperation({
      summary: 'Create a technology',
    }),
  );
}
