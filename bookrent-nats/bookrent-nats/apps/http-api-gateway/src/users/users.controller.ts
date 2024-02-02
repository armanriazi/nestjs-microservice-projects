import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  HttpException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {

    return await this.natsClient.send({ cmd: 'createUser' }, createUserDto);    
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await lastValueFrom(
      this.natsClient.send({ cmd: 'getUserById' }, { userId: id }),
    );
    if (user) return user;
    else throw new HttpException('User Not Found', 404);
  }

  @Get('findUserAll')
  async findUserAll() {
    const user = await lastValueFrom(
      this.natsClient.send({ cmd: 'findUserAll' }, {data:''}),
    );
    if (user) return user;
    else throw new HttpException('User Not Found', 404);
  }
}
