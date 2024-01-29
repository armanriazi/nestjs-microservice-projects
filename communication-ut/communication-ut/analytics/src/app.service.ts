import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './Events/create-user.event';

@Injectable()
export class AppService {
  private readonly analytics: any[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handlerUserCreated - ANALYTICS', data);
    this.analytics.push({
      username: data.username,
      timestamp: new Date(),
    });
    
  }

  getAnalytics() : any[] {   
    return this.analytics;
  }
}
