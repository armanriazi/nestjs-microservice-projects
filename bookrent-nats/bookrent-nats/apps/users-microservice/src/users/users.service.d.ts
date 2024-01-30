import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from './dtos/CreateUser.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getUserById(user_id: number): Promise<User>;
}
//# sourceMappingURL=users.service.d.ts.map