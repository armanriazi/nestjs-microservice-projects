import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
//import { Order } from './Order';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email?: string;

  @Column({ nullable: true })
  password: string;
}
