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

  // @ManyToOne(() => Vacancy)
  // @JoinColumn()
  // vacancy: Vacancy[];

  // @ManyToOne(() => Technology)
  // @JoinColumn()
  // technology: Technology[];
}
