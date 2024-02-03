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
exports.UsersMicroserviceController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const CreateUser_dto_1 = require("./dtos/CreateUser.dto");
const users_service_1 = require("./users.service");
const cqrs_1 = require("@nestjs/cqrs");
const impl_1 = require("../queries/impl");
let UsersMicroserviceController = class UsersMicroserviceController {
    constructor(usersService, queryBus) {
        this.usersService = usersService;
        this.queryBus = queryBus;
    }
    async findUserAll() {
        return this.queryBus.execute(new impl_1.GetUsersQuery());
    }
    getUserById(data) {
        const { userId } = data;
        return this.queryBus.execute(new impl_1.GetUserByIdQuery(userId));
    }
    createUser(data) {
        return this.usersService.createUser(data);
    }
    orderCreated(data) {
        console.info('------orderCreated2-----');
        console.info(data);
    }
    createOrder(data) {
        console.info('------orderCreated1-----');
        console.info(data);
    }
    inQueueOrderCreate(data) {
        console.info(data);
    }
};
exports.UsersMicroserviceController = UsersMicroserviceController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'findUserAll' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersMicroserviceController.prototype, "findUserAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'getUserById' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersMicroserviceController.prototype, "getUserById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'createUser' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersMicroserviceController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.EventPattern)('orderCreated'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersMicroserviceController.prototype, "orderCreated", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'createOrder' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersMicroserviceController.prototype, "createOrder", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'inQueueOrderCreate' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersMicroserviceController.prototype, "inQueueOrderCreate", null);
exports.UsersMicroserviceController = UsersMicroserviceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        cqrs_1.QueryBus])
], UsersMicroserviceController);
//# sourceMappingURL=users.controller.js.map