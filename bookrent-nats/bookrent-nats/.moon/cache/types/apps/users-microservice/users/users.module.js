"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const User_1 = require("../typeorm/entities/User");
const Order_1 = require("../typeorm/entities/Order");
const cqrs_1 = require("@nestjs/cqrs");
const handlers_1 = require("../queries/handlers");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const accessToken_strategy_1 = require("../auth/strategies/accessToken.strategy");
const refreshToken_strategy_1 = require("../auth/strategies/refreshToken.strategy");
const constants_1 = require("../auth/constants");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth/auth.service");
const auth_controller_1 = require("../auth/auth.controller");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '30s' },
            }),
            typeorm_1.TypeOrmModule.forFeature([User_1.User, Order_1.Order]),
            cqrs_1.CqrsModule,
        ],
        controllers: [users_controller_1.UsersMicroserviceController, auth_controller_1.AuthMicroserviceController],
        providers: [
            users_service_1.UsersService,
            auth_service_1.AuthService,
            config_1.ConfigService,
            jwt_1.JwtService,
            accessToken_strategy_1.AccessTokenStrategy,
            refreshToken_strategy_1.RefreshTokenStrategy,
            ...handlers_1.QueryHandlers,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map