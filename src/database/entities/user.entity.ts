import { UserRoleEnum } from 'src/auth/config';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Vacancy } from './index';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 64, nullable: false, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.candidate,
  })
  role: UserRoleEnum;

  @CreateDateColumn({ default: new Date() })
  createAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.advertiser)
  @JoinColumn()
  vacancy: Vacancy;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error with password hash.');
    }
  }
}
