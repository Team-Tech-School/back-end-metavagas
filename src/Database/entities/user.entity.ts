import { UserRoleEnum } from 'src/Config';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
<<<<<<< HEAD
  OneToMany,
  JoinColumn,
=======
  DeleteDateColumn,
>>>>>>> origin/main
} from 'typeorm';
import { Vacancy } from './vacancy.entity';

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
    default: UserRoleEnum.CANDIDATE,
  })
  role: UserRoleEnum;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

<<<<<<< HEAD
  @OneToMany(() => Vacancy, (vacancy) => vacancy.user)
  @JoinColumn()
  vacancy: Vacancy;
=======
  @DeleteDateColumn()
  deleteAt: Date;
>>>>>>> origin/main
}
