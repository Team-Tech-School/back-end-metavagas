import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDtoDocs {
  @ApiProperty({
    type: String,
    example: 'Arnia',
    required: true,
    description: 'Company first name.',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Campinas',
    required: true,
    description: 'Name of the city.',
  })
  city: string;

  @ApiProperty({
    type: String,
    example: 'SP or São paulo',
    required: true,
    description: 'State Name.',
  })
  state: string;

  @ApiProperty({
    type: String,
    example: 'Avenida Ranulfo Barbosa dos Santos - Jardim Camburi',
    required: true,
    description: 'Address of the company.',
  })
  address: string;

  @ApiProperty({
    type: String,
    example: '26051982',
    required: true,
    description: 'Date of foundation of the company.',
  })
  foundedAt: string;

  @ApiProperty({
    type: String,
    example: 'Francisco',
    required: true,
    description:
      'This company was created in 26/05/1982 with the purpose of recruiting young beginners in the technology market....',
  })
  description: string;
}
