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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const microservices_1 = require("@nestjs/microservices");
const orders_repository_1 = require("./orders.repository");
const rxjs_1 = require("rxjs");
const order_model_1 = require("./models/order.model");
const CreateTransitionOrder_dto_1 = require("./dtos/CreateTransitionOrder.dto");
const crypto_1 = require("crypto");
let OrdersService = class OrdersService {
    constructor(ordersRepository, natsClient) {
        this.ordersRepository = ordersRepository;
        this.natsClient = natsClient;
    }
    delay(milliseconds, count) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
    }
    async createOrder({ userId, ...createOrderCmd }) {
        const user = await (0, rxjs_1.lastValueFrom)(this.natsClient.send({ cmd: 'getUserById' }, { userId }));
        const rnd = (0, crypto_1.randomInt)(0, 7);
        if (rnd > 3) {
            const { id, username, email, displayName, orders } = await (0, rxjs_1.lastValueFrom)(this.natsClient.send({ cmd: 'getUserById' }, { userId }));
            const { bookname } = { ...createOrderCmd };
            console.log('\n---QUEUE---');
            const old_orders = [orders];
            {
                const finalCreatedTransitionOrder = new CreateTransitionOrder_dto_1.CreateTransitionOrder(bookname);
                const orders = old_orders
                    ? old_orders.concat([finalCreatedTransitionOrder])
                    : [{ finalCreatedTransitionOrder }];
                await (0, rxjs_1.lastValueFrom)(this.natsClient.emit('inQueueOrderCreate', {
                    id,
                    username,
                    email,
                    displayName,
                    orders,
                }));
            }
            for (let i = 0; i < rnd; i++) {
                await this.delay(rnd * 100, i);
            }
            console.log('\n---End of delay---');
        }
        if (user) {
            const repoOrder = await this.ordersRepository.createOrder(createOrderCmd.bookname, createOrderCmd.bookstateType, user);
            const result = new order_model_1.OrderModel(repoOrder.id, repoOrder.createdAt, repoOrder.updatedAt);
            return result;
        }
        return null;
    }
    async deleteOrder({ id }) {
        const order = await (0, rxjs_1.lastValueFrom)(this.natsClient.send({ cmd: 'getOrderById' }, { id }));
        if (order) {
            const deletedOrder = (await this.ordersRepository.delete(order)).raw();
            return this.ordersRepository.save(deletedOrder);
        }
        return id;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_repository_1.OrdersRepository)),
    __param(1, (0, common_1.Inject)('NATS_SERVICE')),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        microservices_1.ClientProxy])
], OrdersService);
//# sourceMappingURL=orders.service.js.map