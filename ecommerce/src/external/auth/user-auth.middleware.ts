import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const resp = await axios.get(
        `${process.env.SERVICE_AUTH_HOST}/auth/jwt/user/access_token`,
        {
          headers: {
            Authorization: `${req.headers['authorization']}`,
          },
        },
      );

      if (resp.status !== 200) {
        console.log('Error');
        throw new UnauthorizedException();
      }
      req.headers.token = req.headers['authorization'];
      req.headers.user = resp.data;
      next();
    } catch (e) {
      console.log(e.message);
      throw new UnauthorizedException();
    }
  }
}
