import { ApiProperty } from '@nestjs/swagger';

export class getIdvacacyDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'vacancy unique identifier.',
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'Developer front-end',
    required: true,
    description: 'Vacancy first name.',
  })
  vacancyRole: string;

  @ApiProperty({
    type: Number,
    example: '4000',
    required: true,
    description: 'Vacancy salary.',
  })
  wage: number;

  @ApiProperty({
    type: String,
    example: 'campinas',
    required: true,
    description: 'Vacancy location.',
  })
  location: string;

  @ApiProperty({
    type: String,
    example: 'Remoto',
    required: true,
    description: 'Vacancy type.',
  })
  vacancyType: string;

  @ApiProperty({
    type: String,
    example:
      'experiência em desenvolvimento Front End com fortes habilidades em Javascript',
    required: true,
    description: 'Vacancy description.',
  })
  vacancyDescription: string;

  @ApiProperty({
    type: String,
    example: 'Júnior',
    required: true,
    description: 'Vacancy level.',
  })
  level: string;

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

  @ApiProperty({
    example: {
      name: 'Arnia',
    },
  })
  company: string;

  @ApiProperty({
    example: {
      name: 'Francisco',
    },
  })
  advertiser: string;
}
