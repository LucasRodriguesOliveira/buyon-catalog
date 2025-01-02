import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
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
import { FindUserProductByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/user-product/find-user-product-by-id.proxy';
import { FindUserProductByIdUseCase } from 'src/usecases/user-product/find-user-product-by-id.usecase';
import { UpdateUserProductProxy } from 'src/infrastructure/usecase-proxy/proxies/user-product/update-user-product.proxy';
import { UpdateUserProductUseCase } from 'src/usecases/user-product/update-user-product.usecase';
import { DeleteUserProductByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/user-product/delete-user-product-by-id.proxy';
import { DeleteUserProductByIdUseCase } from 'src/usecases/user-product/delete-user-product-by-id.usecase';
import { FindUserProductByIdPresenter } from './presenter/find-user-product-by-id.presenter';
import { ParseBigIntPipe } from 'src/infrastructure/common/pipe/parse-bigint.pipe';
import { UpdateUserProductPresenter } from './presenter/update-user-product.presenter';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { DeleteUserProductByIdPresenter } from './presenter/delete-user-product-by-id.presenter';

@Controller('user-product')
@ApiTags('UserProduct')
export class UserProductController {
  constructor(
    @Inject(FindAllUserProductsProxy.Token)
    private readonly findAllUserProductsUseCase: FindAllUserProductsUseCase,
    @Inject(CreateUserProductProxy.Token)
    private readonly createUserProductUseCase: CreateUserProductUseCase,
    @Inject(FindUserProductByIdProxy.Token)
    private readonly findUserProductByIdUseCase: FindUserProductByIdUseCase,
    @Inject(UpdateUserProductProxy.Token)
    private readonly updateUserProductUseCase: UpdateUserProductUseCase,
    @Inject(DeleteUserProductByIdProxy.Token)
    private readonly deleteUserProductByIdUseCase: DeleteUserProductByIdUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [ListUserProductsPresenter],
  })
  @UseInterceptors(new PresenterInterceptor(ListUserProductsPresenter))
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

  @Get(':userProductId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindUserProductByIdPresenter,
  })
  @UseInterceptors(new PresenterInterceptor(FindUserProductByIdPresenter))
  public async find(
    @Param('userProductId', ParseBigIntPipe) userProductId: bigint,
  ): Promise<UserProductModel> {
    return this.findUserProductByIdUseCase.run(userProductId);
  }

  @Put(':userProductId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateUserProductPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(UpdateUserProductPresenter))
  @UseGuards(JwtGuard)
  public async update(
    @Param('userProductId', ParseBigIntPipe) userProductId: bigint,
    @Body(ValidationPipe) { active }: UpdateUserProductDto,
  ): Promise<UserProductModel> {
    return this.updateUserProductUseCase.run(userProductId, active);
  }

  @Delete(':userProductId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeleteUserProductByIdPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(DeleteUserProductByIdPresenter))
  @UseGuards(JwtGuard)
  public async deleteById(
    @Param('userProductId', ParseBigIntPipe) userProductId: bigint,
  ): Promise<UserProductModel> {
    return this.deleteUserProductByIdUseCase.run(userProductId);
  }
}
