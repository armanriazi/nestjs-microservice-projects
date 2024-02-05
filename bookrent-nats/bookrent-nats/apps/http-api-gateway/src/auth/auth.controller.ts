import { Controller, Inject, Post, Body, HttpException, Get , Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignInDto } from './dto/auth.dto';
import { lastValueFrom } from 'rxjs';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signInAuth(@Body() signInDto: SignInDto) {

    const signin = await lastValueFrom(
      this.natsClient.send({ cmd: 'login' }, signInDto),
    );               
    if (signin) return {...signin};
    else throw new HttpException('SignIn Failed', 404);       
  }
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Get()
  // async find() {
  //   return this.queryBus.execute(new ListTaskQuery());
  // }

  // @Get(':id')
  // async findById(@Param('id') id: number) {
  //   return this.queryBus.execute(new ListByIdTaskQuery(id));
  // }

  // @Patch(':id/completed/:completed')
  // async updateByCompleted(
  //   @Param('id') id: number,
  //   @Param('completed') completed: boolean,
  // ) {
  //   return this.commandBus.execute(new UpdateByCompletedCommand(id, completed));
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return this.commandBus.execute(new DeleteTaskCommand(id));
  //}
}
