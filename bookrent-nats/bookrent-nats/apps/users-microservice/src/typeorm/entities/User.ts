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
  password: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  displayName?: string;

  @OneToMany(() => Order, (Order) => Order.user)
  @JoinColumn()
  orders: Order[];

  @Column({ type: 'datetime', default: () => new Date() })
  @CreateDateColumn()
  createdAt?: Date;

  @Column({ type: 'datetime', default: () => new Date() })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true })
  refreshToken?: string;
}
