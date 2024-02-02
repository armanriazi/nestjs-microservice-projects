import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { User } from 'dist/typeorm/entities/User';

@Controller()
export class UsersMicroserviceController {
  constructor(private usersService: UsersService) {}
  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(@Payload() data) {
    const { userId } = data;
    return this.usersService.getUserById(userId);
  }

  @MessagePattern({ cmd: 'queueUserById' })
  queueUserById(@Payload() data) {
    const { userId } = data;
    const user = this.usersService.getUserById(userId);
    // TODO: Having data user will fetch from DB, we must map bookstateType= 'QUEUE' at the latest record
    //const someNumbers = user<Array>;
    console.log(user);
    return user;
  }

  @EventPattern('orderCreated')
  orderCreated(@Payload() data: any) {
    console.info(data);
  }
  @EventPattern('inQueueOrderCreated')
  inQueueOrderCreated(@Payload() data: any) {
    console.info(data);
  }

}
