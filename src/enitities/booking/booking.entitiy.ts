/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.enitity';
@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.clientBookings)
  client: User;

  @ManyToOne(() => User, (user) => user.professionalBookings)
  professional: User;

  @Column()
  service: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';

  @CreateDateColumn()
  createdAt: Date;
}
