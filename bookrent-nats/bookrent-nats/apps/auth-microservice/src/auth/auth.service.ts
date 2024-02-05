import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  hello() {
    console.log('Hello');
  }
}
