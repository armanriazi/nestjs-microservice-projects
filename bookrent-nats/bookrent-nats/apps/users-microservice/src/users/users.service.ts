import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
//import { OrdersService } from '../../../orders-microservice/src/orders/orders.service';
import { Injectable, Inject } from '@nestjs/common';
//import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
//import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  createUser(createUserDto: CreateUserDto) {
    
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

 
  async getUserById(userId: string) {     
    
    return this.usersRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
    });
  }

}
