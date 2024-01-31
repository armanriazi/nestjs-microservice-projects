import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  async createOrder({ userId, ...createOrderDto }: CreateOrderDto) {
    const user = await lastValueFrom<User>(
      this.natsClient.send({ cmd: 'getUserById' }, { userId }),
    );
    console.log(user);
    if (user) {
      const newOrder = this.ordersRepository.create({
        ...createOrderDto,
        user,
      });
      console.log(newOrder);
      return this.ordersRepository.save(newOrder);
    }
    return null;
  }
}
