import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCompanyDtoDocs } from './create-company.dto';

export class CompanyDtoDoc extends PartialType(CreateCompanyDtoDocs) {
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
    type: String,
    example: '1982-05-26T03:00:00.000Z',
    required: true,
    description: 'Date of foundation of the company.',
  })
  foundedAt: string;

  @ApiProperty({
    type: Date,
    example: null,
    description: 'Date when user was deleted.',
  })
  deletedAt?: Date;
}
