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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.BookStateType = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var BookStateType;
(function (BookStateType) {
    BookStateType[BookStateType["RENTED"] = 0] = "RENTED";
    BookStateType[BookStateType["QUEUE"] = 1] = "QUEUE";
    BookStateType[BookStateType["READY"] = 2] = "READY";
})(BookStateType || (exports.BookStateType = BookStateType = {}));
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "bookname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BookStateType,
        default: BookStateType.READY,
    }),
    __metadata("design:type", Number)
], Order.prototype, "bookstateType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.orders),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' })
], Order);
//# sourceMappingURL=Order.js.map