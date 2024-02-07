import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GetUserByIdQuery, GetUserByUserName } from '../queries/impl';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //* Auth */
  async validateUser(username: string, pass: string) {
    const user = await this.usersService.getUserByUserName(
      new GetUserByUserName(username),
    );
    const passwordMatches = await argon2.verify(
      await this.hashData(pass),
      user.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    } else {
      return user;
    }
    return null;
  }
  hashData(data: string) {
    return argon2.hash(data);
  }
  async signIn(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const userId = user.id;
    const tokens = await this.getTokens(userId, user.username);
    const userToken = { userId, username, ...tokens };
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return userToken;
  }
  async signOut(userId: string) {
    return await this.usersService.update(userId, { refreshToken: null });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '5m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '1d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.getUserById(
      new GetUserByIdQuery(userId),
    );
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
