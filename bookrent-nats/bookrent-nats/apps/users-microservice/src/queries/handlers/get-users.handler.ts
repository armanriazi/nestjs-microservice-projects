import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { UsersService } from '../../users/users.service';
import { GetUsersQuery } from '../impl';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userService: UsersService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_query: GetUsersQuery) {
    console.log(clc.yellowBright('Async GetUsersQuery...'));
    return this.userService.findAll();
  }
}
