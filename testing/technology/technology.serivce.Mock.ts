import { TechnologysService } from '../../src/technologies/technologies.service';

export const technologyServiceMock = {
  provide: TechnologysService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      tecName: 'typescript',
      creatorsName: 'Creator 1',
      createAt: new Date('2024-05-25T05:47:00.812Z'),
      updateAt: new Date('2024-05-25T05:47:00.812Z'),
      deleteAt: null,
    }),
    getByName: jest.fn(),
  },
};
