import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery, GetUserByIdQuery } from '../queries/impl';

@Controller()
export class UsersMicroserviceController {
  constructor(
    private usersService: UsersService,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'findUserAll' })
  async findUserAll() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(@Payload() data) {
    const { userId } = data;
    return this.queryBus.execute(new GetUserByIdQuery(userId));
  }

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @EventPattern('orderCreated')
  orderCreated(@Payload() data: any) {
    console.info('------orderCreated2-----');
    console.info(data);
  }
  @MessagePattern({ cmd: 'createOrder' })
  createOrder(@Payload() data: any) {
    console.info('------orderCreated1-----');
    console.info(data);
  }
  //@EventPattern('inQueueOrderCreate')
  @MessagePattern({ cmd: 'inQueueOrderCreate' })
  inQueueOrderCreate(@Payload() data: any) {
    console.info(data);
  }
}
