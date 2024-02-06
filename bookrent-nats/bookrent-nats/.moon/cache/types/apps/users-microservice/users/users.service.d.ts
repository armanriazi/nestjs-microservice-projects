import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { GetUserByIdQuery, GetUserByUserName } from '../queries/impl/index';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
export declare class UsersService {
    private usersRepository;
    private jwtService;
    private configService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    hashData(data: string): Promise<string>;
    findAll(): Promise<User[]>;
    getUserById(user: GetUserByIdQuery): Promise<User>;
    getUserByUserName(user: GetUserByUserName): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
}
