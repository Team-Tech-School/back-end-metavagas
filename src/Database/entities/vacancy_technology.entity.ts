import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Technology, Vacancy } from './index';

@Entity('vacancy_technology')
export class VacancyToTechnology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  vacancyId: number;

  @Column({ type: 'int' })
  technologyId: number;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.vacancyToTechnology)
  vacancy: Vacancy;

  @ManyToOne(() => Technology, (technology) => technology.vacancyToTechnology)
  technology: Technology;
}
