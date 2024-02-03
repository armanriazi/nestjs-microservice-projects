import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum BookStateType {
  RENTED,
  QUEUE,
  READY,
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  bookname: string;

  @Column({
    type: 'enum',
    enum: BookStateType,
    default: BookStateType.READY,
  })
  bookstateType: BookStateType;

  // @Column({ default: false })
  // completed?: boolean;

  @Column({ type: 'datetime', default: () => new Date() })
  @CreateDateColumn()
  createdAt?: Date;

  @Column({ type: 'datetime', default: () => new Date() })
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
