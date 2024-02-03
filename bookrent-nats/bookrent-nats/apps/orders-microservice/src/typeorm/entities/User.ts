import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './Order';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  displayName?: string;

  @Column({ type: 'datetime', default: () => new Date() })
  @CreateDateColumn()
  createdAt?: Date;

  @Column({ type: 'datetime', default: () => new Date() })
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Order, (Order) => Order.user)
  @JoinColumn()
  orders: Order[];
}
