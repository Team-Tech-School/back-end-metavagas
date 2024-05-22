import { ApiProperty } from '@nestjs/swagger';
import { TechnologyDtoDocs } from './create-dto-docs';

export class TechnologyExtendsDtoDocs extends TechnologyDtoDocs {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Users unique identifier.',
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
