import { ApiProperty } from '@nestjs/swagger';
import { CompanyDtoDoc } from '../company';
import { UserCreatedDoc } from '../users';

export class VacancyDtoDocsOrigin {
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
    type: CompanyDtoDoc,
    required: true,
    example: '2',
    description: 'Vacancy company id.',
  })
  companyId: string;

  @ApiProperty({
    type: UserCreatedDoc,
    required: true,
    example: '1',
    description: 'Vacancy advertiser id.',
  })
  advertiserId: string;
}
