import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthMicroserviceController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async signIn(@Payload() data) {
    const token = await this.authService.signIn(data.username, data.password);
    return token ? token : null;
  }

  @MessagePattern({ cmd: 'logout' })
  async signOut(@Payload() data) {
    const token = await this.authService.signOut(data.id);
    return token ? token : null;
  }

  // @EventPattern('loginned')
  // async authSignined(@Payload() data: any): Promise<any> {

  // }

  // @Post('signup')
  // signup(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.signUp(createUserDto);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Get('logout')
  // logout(@Req() req: Request) {
  //   this.authService.logout(req.user['sub']);
  // }

  // @UseGuards(RefreshTokenGuard)
  // @Get('refresh')
  // refreshTokens(@Req() req: Request) {
  //   const userId = req.user['sub'];
  //   const refreshToken = req.user['refreshToken'];
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
