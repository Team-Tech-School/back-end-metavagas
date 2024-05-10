import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Technology, Vacancy } from './index';

@Entity('vacancy_technology')
export class VacancyToTechnology {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Vacancy, (vacancy) => vacancy.id)
  // @JoinColumn({ name: 'vacancyId' })
  // vacancy: Vacancy[];

  // @ManyToOne(() => Technology, (technology) => technology.id)
  // @JoinColumn({ name: 'technologyId' })
  // technology: Technology[];

  @ManyToOne((type) => Technology)
  @JoinColumn()
  technology: Technology;

  @ManyToOne((type) => Vacancy)
  @JoinColumn()
  vacancy: Vacancy;
}
