"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_controller_1 = require("./orders.controller");
const nats_client_module_1 = require("../nats-client/nats-client.module");
const orders_service_1 = require("./orders.service");
const typeorm_1 = require("@nestjs/typeorm");
const Order_1 = require("../typeorm/entities/Order");
const User_1 = require("../typeorm/entities/User");
const cqrs_1 = require("@nestjs/cqrs");
const handlers_1 = require("../commands/handlers");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([User_1.User, Order_1.Order]),
            nats_client_module_1.NatsClientModule,
            cqrs_1.CqrsModule,
        ],
        controllers: [orders_controller_1.OrdersMicroserviceController],
        providers: [orders_service_1.OrdersService, ...handlers_1.CommandHandlers],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map