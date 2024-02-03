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
const cqrs_1 = require("@nestjs/cqrs");
const handlers_1 = require("../commands/handlers");
const orders_repository_1 = require("./orders.repository");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([orders_repository_1.OrdersRepository]),
            nats_client_module_1.NatsClientModule,
            cqrs_1.CqrsModule,
        ],
        controllers: [orders_controller_1.OrdersMicroserviceController],
        providers: [orders_service_1.OrdersService, ...handlers_1.CommandHandlers],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map