import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserProductProxy } from 'src/infrastructure/usecase-proxy/proxies/user-product/create-user-product.proxy';
import { CreateUserProductUseCase } from 'src/usecases/user-product/create-user-product.usecase';
import { CreateUserProductPresenter } from './presenter/create-user-product.presenter';
import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
import { JwtGuard } from 'src/infrastructure/common/guard/jwt.guard';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UserProductModel } from 'src/domain/model/user-product.model';
import { GetUser } from 'src/infrastructure/common/decorator/get-user.decorator';
import { UserModel } from 'src/domain/model/user.model';
import { FindAllUserProductsProxy } from 'src/infrastructure/usecase-proxy/proxies/user-product/find-all-user-products.proxy';
import { FindAllUserProductsUseCase } from 'src/usecases/user-product/find-all-user-products.usecase';
import { ListUserProductsPresenter } from './presenter/list-user-products.presenter';
import { QueryListUserProductDto } from './dto/query-list-user-product.dto';

@Controller('user-product')
@ApiTags('UserProduct')
export class UserProductController {
  constructor(
    @Inject(FindAllUserProductsProxy.Token)
    private readonly findAllUserProductsUseCase: FindAllUserProductsUseCase,
    @Inject(CreateUserProductProxy.Token)
    private readonly createUserProductUseCase: CreateUserProductUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [ListUserProductsPresenter],
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(ListUserProductsPresenter))
  @UseGuards(JwtGuard)
  public async list(
    @Query(ValidationPipe) { userId, productId }: QueryListUserProductDto,
  ): Promise<UserProductModel[]> {
    return this.findAllUserProductsUseCase.run(userId, productId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreateUserProductPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(CreateUserProductPresenter))
  @UseGuards(JwtGuard)
  public async create(
    @Body(ValidationPipe) { productId }: CreateUserProductDto,
    @GetUser() user: UserModel,
  ): Promise<UserProductModel> {
    return this.createUserProductUseCase.run({ userId: user.id, productId });
  }
}
