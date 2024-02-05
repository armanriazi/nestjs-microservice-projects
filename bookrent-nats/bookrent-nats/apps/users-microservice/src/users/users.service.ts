import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { GetUserByIdQuery, GetUserByUserName } from '../queries/impl/index';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
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

  async getUserByUserName(user: GetUserByUserName): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: { username: user.username },
      //relations: ['orders'],
    });
    return result;
  }

  //* Insert */
  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  //* Auth */
  async signIn(username: string, pass: string) {
    const user = await this.getUserByUserName(new GetUserByUserName(username));
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
