import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Vacancy } from './vacancy.entity';
import { Technology } from './technology.entity';

@Entity('Vacancies_Technologies')
export class Vacancies_Technologies {
  // @PrimaryGeneratedColumn()
  // id: number;
  // @ManyToOne(() => Vacancy, (vacancy) => vacancy.Technology)
  // @JoinColumn({ name: 'vacancyId' })
  // vacancies: Vacancy;
  // @ManyToOne(() => Technology, (technology) => technology.vacancy)
  // @JoinColumn({ name: 'technologyId' })
  // Technologies: Technology;
}
