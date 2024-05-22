import { ApiProperty } from '@nestjs/swagger';

export class TechnologyDtoDocs {
  @ApiProperty({
    type: String,
    example: 'Typescript',
    required: true,
    description: 'Technology name.',
  })
  tecName: string;

  @ApiProperty({
    type: String,
    example: 'Fabricio',
    required: true,
    description: 'Technology creator.',
  })
  creatorsName: string;
}
