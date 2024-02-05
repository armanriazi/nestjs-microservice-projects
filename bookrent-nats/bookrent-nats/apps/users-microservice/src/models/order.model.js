"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const cqrs_1 = require("@nestjs/cqrs");
class OrderModel extends cqrs_1.AggregateRoot {
    constructor(id, _createdAt, _updatedAt) {
        super();
        this.id = id;
        this.createdAt = _createdAt;
        this.updatedAt = _updatedAt;
    }
}
exports.OrderModel = OrderModel;
//# sourceMappingURL=order.model.js.map