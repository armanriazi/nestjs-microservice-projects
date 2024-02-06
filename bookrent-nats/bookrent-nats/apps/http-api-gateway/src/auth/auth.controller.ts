import { Controller, Inject, Post, Body, HttpException, Get , Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { SignInDto } from './dto/auth.dto';
import { lastValueFrom } from 'rxjs';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('login')
  async signIn(@Body() req) {   
    const signin = await lastValueFrom(
      this.natsClient.send({ cmd: 'login' }, req),
    );     
    if (signin) return {...signin};
    else throw new HttpException('SignIn Failed', 404);       
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async signOut(@Body() req) {   
    const signin = await lastValueFrom(
      this.natsClient.send({ cmd: 'logout' }, req),
    );     
    if (signin) return {...signin};
    else throw new HttpException('SignIn Failed', 404);       
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
