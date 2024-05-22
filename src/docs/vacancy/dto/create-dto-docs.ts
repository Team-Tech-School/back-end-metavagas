import { ApiProperty } from '@nestjs/swagger';
import { UserCreatedDoc } from '../../users/dto';
import { CompanyDtoDoc } from '../../company/dto';

export class CreateVacancyDtoDocs {
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
    example: {
      name: 'Arnia',
      city: 'Campinas',
      state: 'SP or São paulo',
      address: 'Avenida Ranulfo Barbosa dos Santos - Jardim Camburi',
      foundedAt: '26051982',
      description: 'Francisco',
      id: 2,
      createdAt: '2024-05-17T02:22:02.659Z',
      updatedAt: '2024-05-17T02:22:02.659Z',
      deletedAt: null,
    },
    description: 'Vacancy company id.',
  })
  companyId: string;

  @ApiProperty({
    type: UserCreatedDoc,
    required: true,
    example: {
      name: 'Francisco',
      email: 'example@gmail.com',
      password: '12345',
      role: 'advertiser',
      id: 1,
      createdAt: '2024-05-17T02:27:38.736Z',
      updatedAt: '2024-05-17T02:27:38.736Z',
      deletedAt: null,
    },
    description: 'Vacancy advertiser id.',
  })
  advertiserId: string;
}
