import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { GetUserByIdQuery } from 'src/queries/impl';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    getUserById(user: GetUserByIdQuery): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
