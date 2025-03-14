/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/users.enitity';

@Entity()
export class ServiceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  client: User;

  @Column()
  category: string;

  @Column({ type: 'enum', enum: ['pending', 'accepted', 'completed'] })
  status: 'pending' | 'accepted' | 'completed';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
