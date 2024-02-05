"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_1 = require("../typeorm/entities/User");
const common_1 = require("@nestjs/common");
const index_1 = require("../queries/impl/index");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async findAll() {
        return this.usersRepository.find({
            relations: ['orders'],
        });
    }
    async getUserById(user) {
        const result = await this.usersRepository.findOne({
            where: { id: user.userId },
            relations: ['orders'],
        });
        return result;
    }
    async getUserByUserName(user) {
        const result = await this.usersRepository.findOne({
            where: { username: user.username },
        });
        return result;
    }
    async createUser(createUserDto) {
        const newUser = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(newUser);
    }
    async signIn(username, pass) {
        const user = await this.getUserByUserName(new index_1.GetUserByUserName(username));
        if (user?.password !== pass) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map