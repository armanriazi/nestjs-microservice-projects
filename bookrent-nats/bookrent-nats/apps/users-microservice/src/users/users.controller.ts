import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery, GetUserByIdQuery } from '../queries/impl';
import { OrderModel } from '../models/order.model';

@Controller()
export class UsersMicroserviceController {
  private dataInqueue: OrderModel;
  constructor(
    private usersService: UsersService,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'findUserAll' })
  async findUserAll() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(@Payload() data) {
    const { userId } = data;

    return this.dataInqueue
      ? this.dataInqueue
      : await this.queryBus.execute(new GetUserByIdQuery(userId));
  }

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @EventPattern('orderCreated')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orderCreated(@Payload() data: any) {
    this.dataInqueue = null;
  }

  @EventPattern('inQueueOrderCreate')
  inQueueOrderCreate(@Payload() data: OrderModel) {
    this.dataInqueue = data;
  }
}
