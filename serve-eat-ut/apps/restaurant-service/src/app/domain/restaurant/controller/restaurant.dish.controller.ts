// Native.
/* eslint-disable no-useless-escape */

// Package.
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { Logger } from "@eats/logger";
import { AccessTokenGuard } from "../../auth/guards/access_token.guard";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
} from "src/app/app.constants";
import { RestaurantService } from "../services/restaurant.service";
import { Type } from "class-transformer";
import { CreateRestaurantBodyDto, SearchQueryDto } from "../dto/restaurant.dto";
import { User, UserMetaData } from "../../auth/guards/user";
import { RolesGuard } from "../../auth/guards/role-guard";
import { UserRoles } from "@eats/types";
import { RoleAllowed } from "../../auth/guards/role-decorator";
import {
  CreateRestaurantDishBodyDto,
  RestaurantParamParamDto,
  UpdateDishItemParamDto,
  UpdateRestaurantDishBodyDto,
} from "../dto/restaurant.dish.dto";
import { RestaurantDishService } from "../services/restaurant.dish.service";

@ApiBearerAuth("authorization")
@Controller("restaurants")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("restaurant-dish")
export class RestaurantDishController {
  constructor(
    private readonly service: RestaurantDishService,
    private readonly logger: Logger
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "search restaurants based on lat/lon",
  })
  @ApiCreatedResponse({
    description: "dish for restaurant created successfully",
  })
  @RoleAllowed(UserRoles["restaurant-admin"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post("/:id/dish")
  public async createDish(
    @User() user: UserMetaData,
    @Param() param: RestaurantParamParamDto,
    @Body() payload: CreateRestaurantDishBodyDto
  ) {
    return await this.service.createDish(user, param, payload);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "search restaurants based on lat/lon",
  })
  @ApiCreatedResponse({
    description: "dish for restaurant created successfully",
  })
  @RoleAllowed(UserRoles["restaurant-admin"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put("/:id/dish/:dish_id")
  public async updateDish(
    @User() user: UserMetaData,
    @Param() param: UpdateDishItemParamDto,
    @Body() payload: UpdateRestaurantDishBodyDto
  ) {
    return await this.service.updateDish(user, param, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "fetch all dishes from restaurant",
  })
  @UseGuards(AccessTokenGuard)
  @Get("/:id")
  public async fetchDishes(
    @User() user: UserMetaData,
    @Param() param: RestaurantParamParamDto
  ) {
    return await this.service.getAllDishByRestaurant(user, param);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "delete a dish from restaurant menu",
  })
  @RoleAllowed(UserRoles["restaurant-admin"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get("/:id/dish/:dish_id")
  public async deleteDishes(
    @User() user: UserMetaData,
    @Param() param: UpdateDishItemParamDto
  ) {
    return await this.service.deleteDish(user, param);
  }
}
