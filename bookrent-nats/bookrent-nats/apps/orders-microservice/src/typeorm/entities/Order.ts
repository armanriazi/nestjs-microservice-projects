import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

export enum BookStateType {
  RENTED,
  QUEUE,
  READY,
}

@Entity({ name: 'order' })
export class Order {
  // @ManyToOne(() => User, (user) => user.orders)
  // user: User;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('float')
  bookname: string;

  @Column({
    type: 'enum',
    enum: BookStateType,
    default: BookStateType.READY,
  })
  bookstateType: BookStateType;
  
  @JoinColumn()
  user_id: User; //[];
}
