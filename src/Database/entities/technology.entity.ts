import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { VacancyToTechnology } from './index';

@Entity('technology')
export class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  tecName: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  creatorsName: string;

  @CreateDateColumn({ default: new Date() })
  createAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany(
    () => VacancyToTechnology,
    (vacancyToTechnology) => vacancyToTechnology.technology,
  )
  vacancyToTechnology: VacancyToTechnology[];
}
