/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Booking } from '../booking/booking.entitiy';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['client', 'professional'] })
  role: 'client' | 'professional';

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  location: string;

  @OneToMany(() => Booking, (booking) => booking.client)
  clientBookings: Booking[];

  @OneToMany(() => Booking, (booking) => booking.professional)
  professionalBookings: Booking[];

  @BeforeInsert()
  async hashedPassword() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
