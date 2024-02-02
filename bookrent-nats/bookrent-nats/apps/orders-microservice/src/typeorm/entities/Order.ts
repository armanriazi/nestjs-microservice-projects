import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
