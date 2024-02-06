import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
//import { SignInDto } from './dto/auth.dto';
//import { lastValueFrom } from 'rxjs';

@Controller()
export class AuthMicroserviceController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
}
