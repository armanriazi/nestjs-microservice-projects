import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { GetUserByIdQuery, GetUserByUserName } from '../queries/impl/index';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    getUserById(user: GetUserByIdQuery): Promise<User>;
    getUserByUserName(user: GetUserByUserName): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    signIn(username: string, pass: string): Promise<{
        access_token: string;
    }>;
}
