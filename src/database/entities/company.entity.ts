import {
  BeforeInsert,
  BeforeUpdate,
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
import { BadRequestException } from '@nestjs/common';

@Entity('company')
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

  @Column({ type: 'timestamp', nullable: false })
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

  @BeforeInsert()
  @BeforeUpdate()
  async converterParaISO() {
    try {
      const dataString = this.foundedAt;
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataString)) {
        throw new Error('Invalid date format. Use dd/MM/yyyy.');
      }
      const partes = dataString.split('/');
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1; // Meses são zero-based
      const ano = parseInt(partes[2], 10);
      const data = new Date(ano, mes, dia);
      const dataISO = data.toISOString();
      this.foundedAt = dataISO;
    } catch (error) {
      throw new BadRequestException('Invalid date.');
    }
  }
}
