import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'; //UnauthorizedException
import { CreateUserDto } from './dtos/CreateUser.dto';
import { GetUserByIdQuery, GetUserByUserName } from '../queries/impl/index';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  hashData(data: string) {
    return argon2.hash(data);
  }
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
    //const hash = await this.hashData(createUserDto.password);
    const newUser = this.usersRepository.create({
      ...createUserDto,
    });
    // const tokens = await this.getTokens(newUser.id, newUser.username);
    // await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return await this.usersRepository.save(newUser);
  }

  // //* Update */
  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.usersRepository.update(id, updateUserDto);
    return await this.usersRepository.save((await updatedUser).raw);
  }

  //* Remove */
  // async remove(id: string): Promise<User> {
  //   const deletedUser= this.usersRepository.delete(id);
  //   return await this.usersRepository.save((await deletedUser).raw);
  // }
}
