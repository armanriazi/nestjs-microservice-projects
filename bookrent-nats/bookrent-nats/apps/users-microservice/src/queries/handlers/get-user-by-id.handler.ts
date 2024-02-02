import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { UsersService } from '../../users/users.service';
import { GetUserByIdQuery } from '../impl';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userService: UsersService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetUserByIdQuery) {
    console.log(clc.yellowBright('Async GetUserByIdQuery...'));
    return this.userService.getUserById(query);
  }
}
