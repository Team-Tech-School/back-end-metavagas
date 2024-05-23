import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TechnologyExtendsDtoDocs } from '../dto';

export function ApiFindAllTechnologyDocs() {
  return applyDecorators(
    ApiResponse({
      type: TechnologyExtendsDtoDocs,
      status: 201,
      description: 'Get a technology with success.',
      isArray: true,
    }),
    ApiOperation({
      summary: 'Find all technologies',
    }),
  );
}
