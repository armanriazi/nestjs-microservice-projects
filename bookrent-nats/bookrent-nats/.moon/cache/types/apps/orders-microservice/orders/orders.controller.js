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
exports.OrdersMicroserviceController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const cqrs_1 = require("@nestjs/cqrs");
const impl_1 = require("../commands/impl");
const CreateOrder_dto_1 = require("../orders/dtos/CreateOrder.dto");
let OrdersMicroserviceController = class OrdersMicroserviceController {
    constructor(natsClient, commandBus) {
        this.natsClient = natsClient;
        this.commandBus = commandBus;
    }
    async createOrder(data) {
        const newOrder = await this.commandBus.execute(new impl_1.CreateOrdersCommand(data.userId, data.bookname, data.bookstateType));
        if (newOrder)
            this.natsClient.emit('orderCreated', newOrder);
        return newOrder;
    }
};
exports.OrdersMicroserviceController = OrdersMicroserviceController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'createOrder' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrder_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersMicroserviceController.prototype, "createOrder", null);
exports.OrdersMicroserviceController = OrdersMicroserviceController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('NATS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        cqrs_1.CommandBus])
], OrdersMicroserviceController);
//# sourceMappingURL=orders.controller.js.map