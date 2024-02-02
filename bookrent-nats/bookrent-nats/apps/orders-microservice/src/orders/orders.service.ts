import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { CreateTransitionOrder } from './dtos/CreateTransitionOrder.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/typeorm/entities/User';
import { randomInt } from 'crypto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(count);
      }, milliseconds);
    });
  }

  async createOrder({ userId, ...createOrderDto }: CreateOrderDto) {
    const user = await lastValueFrom<User>(
      this.natsClient.send({ cmd: 'getUserById' }, { userId }),
    );

    const rnd = randomInt(3, 20);

    if (rnd > 3) {
      console.log(rnd);

      //console.log('----TMP-----');
      //console.log(tmp);
      const { id, username, email, displayName, orders } =
        await lastValueFrom<User>(
          this.natsClient.send({ cmd: 'getUserById' }, { userId }),
        );
      const { bookname } = { ...createOrderDto };

      console.log('---QUEUE---');

      const old_orders = [orders] as unknown as Array<CreateTransitionOrder>;
      {
        const finalCreatedTransitionOrder = new CreateTransitionOrder(bookname);
        const orders = old_orders
          ? old_orders.concat([finalCreatedTransitionOrder])
          : [{ finalCreatedTransitionOrder }];

        await lastValueFrom<User>(
          this.natsClient.send(
            { cmd: 'inQueueOrderCreated' },
            { id, username, email, displayName, orders },
          ),
        );
      }
    }

    for (let i = 0; i < rnd; i++) {
      // await is converting Promise<number> into number
      await this.delay(rnd * 100, i);
    }

    console.log('\n-----------End of delay---------\n');

    if (user) {
      const newOrder = this.ordersRepository.create({
        ...createOrderDto,
        user,
      });
      //console.log(newOrder);
      return this.ordersRepository.save(newOrder);
    }
    return null;
  }
}
