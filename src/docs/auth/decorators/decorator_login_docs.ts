import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDoc, LoginResponseDoc } from '../dto';

export function ApiLoginDocs() {
  return applyDecorators(
    ApiBody({
      type: LoginDoc,
    }),
    ApiResponse({
      type: LoginResponseDoc,
      status: 201,
      description: 'User successfully authenticated.',
    }),
    ApiResponse({
      status: 401,
      description: 'Email or password wrong.',
    }),
    ApiOperation({
      summary: 'Login',
    }),
  );
}
