import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  DeleteDateColumn,
  JoinTable,
} from 'typeorm';

import { Company, Technology, User } from './index';

@Entity('vacancy')
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80, nullable: false })
  vacancyRole: string;

  @Column({ type: 'int', nullable: false })
  wage: number;

  @Column({ type: 'varchar', length: 80, nullable: false })
  location: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  vacancyType: string;

  @Column({ type: 'varchar', nullable: false })
  vacancyDescription: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  level: string;

  @CreateDateColumn({ default: new Date() })
  createAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Company, (company) => company.vacancies, { nullable: false })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @ManyToOne(() => User, (user) => user.vacancies, { nullable: false })
  @JoinColumn({ name: 'advertiserId' })
  advertiser: User;

  @ManyToMany(() => Technology, (technology) => technology.vacancies)
  @JoinTable({ name: 'vacancies_technologies' })
  technologies: Technology[];
}
