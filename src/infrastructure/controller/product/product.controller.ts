import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductProxy } from 'src/infrastructure/usecase-proxy/proxies/product/create-product.proxy';
import { FindProductByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/product/find-product-by-id.proxy';
import { CreateProductUseCase } from 'src/usecases/product/create-product.usecase';
import { FindProductByIdUseCase } from 'src/usecases/product/find-product-by-id.usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductPresenter } from './presenter/create-product.presenter';
import { FindProductPresenter } from './presenter/find-product.presenter';
import { ProductModel } from 'src/domain/model/product.model';
import { PrismaClientKnownError } from 'src/infrastructure/prisma/prisma-errors.enum';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ListProductPresenter } from './presenter/list-product.presenter';
import { ListProductsProxy } from 'src/infrastructure/usecase-proxy/proxies/product/list-products.proxy';
import { ListProductsUseCase } from 'src/usecases/product/list-products.usecase';
import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
import { UpdateProductPresenter } from './presenter/update-product.presenter';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/product/update-product-by-id.proxy';
import { UpdateProductByIdUseCase } from 'src/usecases/product/update-product-by-id.usecase';
import { DeleteProductByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/product/delete-product-by-id.proxy';
import { DeleteProductByIdUseCase } from 'src/usecases/product/delete-product-by-id.usecase';
import { DeleteProductPresenter } from './presenter/delete-product.presenter';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/infrastructure/common/guard/jwt.guard';
import { AttachCategoryToProductProxy } from 'src/infrastructure/usecase-proxy/proxies/product/attach-category-to-product.proxy';
import { AttachCategoryToProductUseCase } from 'src/usecases/product/attach-category-to-product.usecase';
import { DeattachCategoryToProductProxy } from 'src/infrastructure/usecase-proxy/proxies/product/deattach-category-to-product.proxy';
import { DeattachCategoryToProductUseCase } from 'src/usecases/product/deattach-category-to-product.usecase';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(
    private readonly httpExceptionService: HttpExceptionService,
    private readonly logger: LoggerService,
    @Inject(CreateProductProxy.Token)
    private readonly createProductUseCase: CreateProductUseCase,
    @Inject(FindProductByIdProxy.Token)
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    @Inject(ListProductsProxy.Token)
    private readonly listProductsUseCase: ListProductsUseCase,
    @Inject(UpdateProductByIdProxy.Token)
    private readonly updateProductByIdUseCase: UpdateProductByIdUseCase,
    @Inject(DeleteProductByIdProxy.Token)
    private readonly deleteProductByIdUseCase: DeleteProductByIdUseCase,
    @Inject(AttachCategoryToProductProxy.Token)
    private readonly attachCategoryToProductUseCase: AttachCategoryToProductUseCase,
    @Inject(DeattachCategoryToProductProxy.Token)
    private readonly deattachCategoryToProductUseCase: DeattachCategoryToProductUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new PresenterInterceptor(ListProductPresenter))
  @ApiOkResponse({
    type: [ListProductPresenter],
  })
  public async list() {
    return this.listProductsUseCase.run();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(new PresenterInterceptor(CreateProductPresenter))
  @ApiCreatedResponse({
    type: CreateProductPresenter,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public async create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ) {
    let product: ProductModel;

    try {
      product = await this.createProductUseCase.run(createProductDto);
    } catch (err) {
      const { code } = err as PrismaClientKnownRequestError;

      if (PrismaClientKnownError.UNIQUE_CONSTRAINT === code) {
        this.httpExceptionService.badRequest({
          message: `There's another product with this slug value already`,
          errCode: HttpStatus.BAD_REQUEST,
        });
      }

      console.log({ err, createProductDto });

      this.logger.debug(ProductController.name, code);

      this.logger.error(
        ProductController.name,
        (err as Error).message,
        (err as Error).stack,
      );
      this.httpExceptionService.internalServerError({
        message: `Oh no! Something went wrong.`,
      });
    }

    return product;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindProductPresenter,
  })
  @UseInterceptors(new PresenterInterceptor(FindProductPresenter))
  public async findById(@Param('productId', ParseIntPipe) productId: number) {
    let product: ProductModel;

    try {
      product = await this.findProductByIdUseCase.run(productId);
    } catch (err) {
      const { code } = err as PrismaClientKnownRequestError;

      if (code === PrismaClientKnownError.NOT_FOUND) {
        this.httpExceptionService.notFound({
          message: `Product [${productId}] could not be found`,
          errCode: HttpStatus.NOT_FOUND,
        });
      }
    }

    return product;
  }

  @Put(':productId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new PresenterInterceptor(UpdateProductPresenter))
  @ApiOkResponse({
    type: UpdateProductPresenter,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public async update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    let product: ProductModel;

    try {
      product = await this.updateProductByIdUseCase.run(
        productId,
        updateProductDto,
      );
    } catch (err) {
      console.log(err);
      return;
    }

    return product;
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new PresenterInterceptor(DeleteProductPresenter))
  @ApiOkResponse({
    type: DeleteProductPresenter,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public async delete(@Param('productId', ParseIntPipe) productId: number) {
    let product: ProductModel;

    try {
      product = await this.deleteProductByIdUseCase.run(productId);
    } catch (err) {
      console.log(err);
      return;
    }

    return product;
  }

  @Put(':productId/attach/:categoryId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateProductPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(UpdateProductPresenter))
  @UseGuards(JwtGuard)
  public async attachCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<ProductModel> {
    return this.attachCategoryToProductUseCase.run(productId, categoryId);
  }

  @Put(':productId/deattach/:categoryId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateProductPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(UpdateProductPresenter))
  @UseGuards(JwtGuard)
  public async deattachCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<ProductModel> {
    return this.deattachCategoryToProductUseCase.run(productId, categoryId);
  }
}
