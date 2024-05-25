import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiQueryVacanciesDocs() {
  return applyDecorators(
    ApiQuery({
      name: 'tecName',
      required: false,
      type: String,
    }),
    ApiQuery({
      name: 'vacancyRole',
      required: false,
      type: String,
    }),
    ApiQuery({
      name: 'level',
      required: false,
      type: String,
    }),
    ApiQuery({
      name: 'minSalary',
      required: false,
      type: Number,
    }),
    ApiQuery({
      name: 'maxSalary',
      required: false,
      type: Number,
    }),
    ApiQuery({
      name: 'vacancyType',
      required: false,
      type: String,
    }),
    ApiQuery({
      name: 'location',
      required: false,
      type: String,
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
    }),
  );
}
