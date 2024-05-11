import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  DeleteDateColumn,
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

  @Column({ nullable: false })
  companyId: string;

  @Column({ nullable: false })
  advertiserId: string;

  @CreateDateColumn({ default: new Date() })
  createAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Company, (company) => company.vacancy)
  @JoinColumn()
  company: Company;

  @ManyToOne(() => User, (user) => user.vacancy)
  @JoinColumn()
  advertiser: User;

  @ManyToMany(() => Technology, (technology) => technology.vacancy)
  technology: Technology[];
}
