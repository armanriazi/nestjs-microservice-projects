import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
export declare class UsersMicroserviceController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(data: CreateUserDto): Promise<import("../typeorm/entities/User").User>;
    getUserById(data: any): Promise<import("../typeorm/entities/User").User>;
    orderCreated(data: any): void;
}
//# sourceMappingURL=users.controller.d.ts.map