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
const Order_1 = require("../typeorm/entities/Order");
const typeorm_2 = require("typeorm");
const CreateTransitionOrder_dto_1 = require("./dtos/CreateTransitionOrder.dto");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
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
    async createOrder({ userId, ...createOrderDto }) {
        const user = await (0, rxjs_1.lastValueFrom)(this.natsClient.send({ cmd: 'getUserById' }, { userId }));
        const rnd = (0, crypto_1.randomInt)(3, 20);
        if (rnd > 3) {
            console.log(rnd);
            const { id, username, email, displayName, orders } = await (0, rxjs_1.lastValueFrom)(this.natsClient.send({ cmd: 'getUserById' }, { userId }));
            const { bookname } = { ...createOrderDto };
            console.log('---QUEUE---');
            const old_orders = [orders];
            {
                const finalCreatedTransitionOrder = new CreateTransitionOrder_dto_1.CreateTransitionOrder(bookname);
                const orders = old_orders
                    ? old_orders.concat([finalCreatedTransitionOrder])
                    : [{ finalCreatedTransitionOrder }];
                await (0, rxjs_1.lastValueFrom)(this.natsClient.send({ cmd: 'inQueueOrderCreated' }, { id, username, email, displayName, orders }));
            }
        }
        for (let i = 0; i < rnd; i++) {
            await this.delay(rnd * 100, i);
        }
        console.log('\n-----------End of delay---------\n');
        if (user) {
            const newOrder = this.ordersRepository.create({
                ...createOrderDto,
                user,
            });
            return this.ordersRepository.save(newOrder);
        }
        return null;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Order_1.Order)),
    __param(1, (0, common_1.Inject)('NATS_SERVICE')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        microservices_1.ClientProxy])
], OrdersService);
//# sourceMappingURL=orders.service.js.map