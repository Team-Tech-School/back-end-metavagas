import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TechnologyExtendsDtoDocs } from '../dto';
import { CreateTechnologyDto } from 'src/auth/config';

export function ApiFindOneTechnologyDocs() {
  return applyDecorators(
    ApiResponse({
      type: TechnologyExtendsDtoDocs,
      status: 201,
      isArray: true,
    }),
    ApiResponse({
      type: CreateTechnologyDto,
    }),
    ApiResponse({
      status: 302,
      description: 'Technology not exists.',
    }),
    ApiOperation({
      summary: 'Search for a technology by id',
    }),
  );
}
