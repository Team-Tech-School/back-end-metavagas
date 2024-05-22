import { ApiProperty } from '@nestjs/swagger';
import { CreateCompanyDtoDocs } from './create-company.dto';

export class CompanyDtoDoc extends CreateCompanyDtoDocs {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Company unique identifier.',
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
