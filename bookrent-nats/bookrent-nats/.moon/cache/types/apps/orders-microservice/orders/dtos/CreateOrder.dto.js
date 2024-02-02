"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = exports.BookStateType = void 0;
var BookStateType;
(function (BookStateType) {
    BookStateType[BookStateType["RENTED"] = 0] = "RENTED";
    BookStateType[BookStateType["QUEUE"] = 1] = "QUEUE";
    BookStateType[BookStateType["READY"] = 2] = "READY";
})(BookStateType || (exports.BookStateType = BookStateType = {}));
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=CreateOrder.dto.js.map