import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './Events/create-user.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log(`handleUserCreated - COMMUNICATIONS By Email:${data.email}`);
  }
}
