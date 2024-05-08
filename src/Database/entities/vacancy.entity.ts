import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';

import { User } from '../entities';
import { Company } from './company.entity';

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

  @Column({ nullable: false })
  companyId: string;

  @Column({ nullable: false })
  advertiserId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Company, (company) => company.vacancy)
  @JoinColumn()
  company: Company[];

  @ManyToOne(() => User, (user) => user.vacancy)
  @JoinColumn()
  advertiser: User[];
}
