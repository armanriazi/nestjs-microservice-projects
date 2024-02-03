import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { GetUserByIdQuery } from 'src/queries/impl';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  //* Select */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['orders'],
    });
  }
  async getUserById(user: GetUserByIdQuery): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: { id: user.userId },
      relations: ['orders'],
    });
    return result;
  }

  //* Insert */
  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }
}
