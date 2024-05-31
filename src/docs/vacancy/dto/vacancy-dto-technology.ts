import { ApiProperty } from '@nestjs/swagger';
import { UserCreatedDoc, CompanyDtoDoc } from '../../index';
import { UpdateTechnologyDto } from '../../../auth/config';
export class VacancyTechnologyDtoDocs {
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
      id: 2,
      name: 'Arnia',
      city: 'Campinas',
      state: 'SP or São paulo',
      address: 'Avenida Ranulfo Barbosa dos Santos - Jardim Camburi',
      foundedAt: '1982-05-26T03:00:00.000Z',
      description: 'Francisco',
      createdAt: '2024-05-17T02:22:02.659Z',
      updatedAt: '2024-05-17T02:22:02.659Z',
      deletedAt: null,
    },
    description: 'Vacancy company id.',
  })
  company: string;

  @ApiProperty({
    type: UserCreatedDoc,
    required: true,
    example: {
      id: 1,
      name: 'Francisco',
      email: 'example@gmail.com',
      role: 'advertiser',
      createdAt: '2024-05-17T02:27:38.736Z',
      updatedAt: '2024-05-17T02:27:38.736Z',
      deletedAt: null,
    },
    description: 'Vacancy advertiser id.',
  })
  advertiser: string;

  @ApiProperty({
    type: UpdateTechnologyDto,
    required: true,
    example: {
      id: 1,
      tecName: 'typescript',
      creatorsName: 'fabrício',
      createAt: '2024-05-16T04:16:05.914Z',
      updateAt: '2024-05-16T04:16:05.914Z',
      deleteAt: null,
    },
    description: 'Vacancy technology id.',
  })
  technologies: string;
}
