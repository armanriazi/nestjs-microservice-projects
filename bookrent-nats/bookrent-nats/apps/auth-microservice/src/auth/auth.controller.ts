import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { SignInDto } from './dto/auth.dto';

@Controller()
export class AuthMicroserviceController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @MessagePattern({ cmd: 'login' })
  signinAuth(@Payload() data: SignInDto) {
    //: Promise<SignInDto>
    console.log(data);
    if (data) this.natsClient.emit('authSignined', data);

    //return data;
  }

  @MessagePattern({ cmd: 'profile' })
  getProfile(@Payload() req) {
    return req.user;
  }
}
