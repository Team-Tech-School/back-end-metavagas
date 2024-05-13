import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Vacancy } from './index';

@Entity('companys')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  foundedAt: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @CreateDateColumn({ default: new Date() })
  createAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.company)
  @JoinColumn()
  vacancy: Vacancy;
}
