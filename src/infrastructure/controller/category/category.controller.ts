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
import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
import { CreateCategoryProxy } from 'src/infrastructure/usecase-proxy/proxies/category/create-category.proxy';
import { DeleteCategoryByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/category/delete-category-by-id.proxy';
import { FindCategoryByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/category/find-category-by-id.proxy';
import { ListCategoriesProxy } from 'src/infrastructure/usecase-proxy/proxies/category/list-categories.proxy';
import { UpdateCategoryProxy } from 'src/infrastructure/usecase-proxy/proxies/category/update-category.proxy';
import { CreateCategoryUseCase } from 'src/usecases/category/create-category.usecase';
import { DeleteCategoryByIdUseCase } from 'src/usecases/category/delete-category-by-id.usecase';
import { FindCategoryByIdUseCase } from 'src/usecases/category/find-category-by-id.usecase';
import { ListCategoriesUseCase } from 'src/usecases/category/list-categories.usecase';
import { UpdateCategoryUseCase } from 'src/usecases/category/update-category.usecase';
import { ListCategoriesPresenter } from './presenter/list-categories.presenter';
import { CategoryModel } from 'src/domain/model/category.model';
import { JwtGuard } from 'src/infrastructure/common/guard/jwt.guard';
import { CreateCategoryPresenter } from './presenter/create-category.presenter';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoryByIdPresenter } from './presenter/find-category-by-id.presenter';
import { UpdateCategoryPresenter } from './presenter/update-category.presenter';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteCategoryByIdPresenter } from './presenter/delete-category-by-id.presenter';
import { ParseIntArrayPipe } from 'src/infrastructure/common/pipe/parse-int-array.pipe';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClientKnownError } from 'src/infrastructure/prisma/prisma-errors.enum';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(
    @Inject(CreateCategoryProxy.Token)
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    @Inject(ListCategoriesProxy.Token)
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    @Inject(FindCategoryByIdProxy.Token)
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    @Inject(UpdateCategoryProxy.Token)
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    @Inject(DeleteCategoryByIdProxy.Token)
    private readonly deleteCategoryByIdUseCase: DeleteCategoryByIdUseCase,
    private readonly exceptionService: HttpExceptionService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [ListCategoriesPresenter],
  })
  @UseInterceptors(new PresenterInterceptor(ListCategoriesPresenter))
  public async list(
    @Query('categories', ParseIntArrayPipe)
    categories: number[],
  ): Promise<CategoryModel[]> {
    return this.listCategoriesUseCase.run(categories);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: CreateCategoryPresenter,
  })
  @UseInterceptors(new PresenterInterceptor(CreateCategoryPresenter))
  public async create(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryModel> {
    let category: CategoryModel;

    try {
      category = await this.createCategoryUseCase.run(createCategoryDto);
    } catch (err) {
      const { code } = err as PrismaClientKnownRequestError;

      if (PrismaClientKnownError.UNIQUE_CONSTRAINT === code) {
        this.exceptionService.badRequest({
          message: `There's another category with this slug value already`,
          errCode: HttpStatus.BAD_REQUEST,
        });
      }

      this.logger.error(
        CategoryController.name,
        (err as Error).message,
        (err as Error).stack,
      );
      this.exceptionService.internalServerError({
        message: `Oh no! Something went wrong`,
      });
    }

    return category;
  }

  @Get(':categoryId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindCategoryByIdPresenter,
  })
  @UseInterceptors(new PresenterInterceptor(FindCategoryByIdPresenter))
  public async find(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<CategoryModel> {
    return this.findCategoryByIdUseCase.run(categoryId);
  }

  @Put(':categoryId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateCategoryPresenter,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseInterceptors(new PresenterInterceptor(UpdateCategoryPresenter))
  public async update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryModel> {
    return this.updateCategoryUseCase.run(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeleteCategoryByIdPresenter,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseInterceptors(new PresenterInterceptor(DeleteCategoryByIdPresenter))
  public async delete(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<CategoryModel> {
    return this.deleteCategoryByIdUseCase.run(categoryId);
  }
}
