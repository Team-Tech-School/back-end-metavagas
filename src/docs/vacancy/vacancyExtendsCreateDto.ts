import { ApiProperty } from '@nestjs/swagger';
import { CreateVacancyDtoDocs } from './create-dto-docs';

export class vacancyDtoDocs extends CreateVacancyDtoDocs {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'vacancy unique identifier.',
  })
  id: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Date when user was created.',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Date when user was updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    example: null,
    description: 'Date when user was deleted.',
  })
  deletedAt?: Date;
}
