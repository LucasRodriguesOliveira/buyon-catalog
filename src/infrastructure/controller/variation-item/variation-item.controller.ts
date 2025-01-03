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
import { CreateVariationItemProxy } from 'src/infrastructure/usecase-proxy/proxies/variation-item/create-variation-item.proxy';
import { DeleteVariationItemByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/variation-item/delete-variation-item-by-id.proxy';
import { FindAllVariationItemsProxy } from 'src/infrastructure/usecase-proxy/proxies/variation-item/find-all-variation-items.proxy';
import { UpdateVariationItemProxy } from 'src/infrastructure/usecase-proxy/proxies/variation-item/update-variation-item.proxy';
import { CreateVariationItemUseCase } from 'src/usecases/variation-item/create-variation-item.usecase';
import { DeleteVariationItemByIdUseCase } from 'src/usecases/variation-item/delete-variation-item-by-id.usecase';
import { FindAllVariationItemsUseCase } from 'src/usecases/variation-item/find-all-variation-items.usecase';
import { UpdateVariationItemUseCase } from 'src/usecases/variation-item/update-variation-item.usecase';
import { FindAllVariationItemsPresenter } from './presenter/find-all-variation-items.presenter';
import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
import { VariationItemModel } from 'src/domain/model/variation-item.model';
import { CreateVariationItemPresenter } from './presenter/create-variation-item.presenter';
import { JwtGuard } from 'src/infrastructure/common/guard/jwt.guard';
import { CreateVariationItemDto } from './dto/create-variation-item.dto';
import { UpdateVariationItemPresenter } from './presenter/update-variation-item.presenter';
import { UpdateVariationItemDto } from './dto/update-variation-item.dto';
import { DeleteVariationItemPresenter } from './presenter/delete-variation-item.presenter';

@Controller('variation-item')
@ApiTags('Variation')
export class VariationItemController {
  constructor(
    @Inject(CreateVariationItemProxy.Token)
    private readonly createVariationItemUseCase: CreateVariationItemUseCase,
    @Inject(FindAllVariationItemsProxy.Token)
    private readonly findAllVariationItemsUseCase: FindAllVariationItemsUseCase,
    @Inject(UpdateVariationItemProxy.Token)
    private readonly updateVariationItemUseCase: UpdateVariationItemUseCase,
    @Inject(DeleteVariationItemByIdProxy.Token)
    private readonly deleteVariationItemByIdUseCase: DeleteVariationItemByIdUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindAllVariationItemsPresenter,
  })
  @UseInterceptors(new PresenterInterceptor(FindAllVariationItemsPresenter))
  public async list(
    @Query('variation', ParseIntPipe) variationId: number,
  ): Promise<VariationItemModel[]> {
    return this.findAllVariationItemsUseCase.run(variationId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreateVariationItemPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(CreateVariationItemPresenter))
  @UseGuards(JwtGuard)
  public async create(
    @Body(ValidationPipe) createVariationItemDto: CreateVariationItemDto,
  ): Promise<VariationItemModel> {
    return this.createVariationItemUseCase.run(createVariationItemDto);
  }

  @Put(':variationItemId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateVariationItemPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(UpdateVariationItemPresenter))
  @UseGuards(JwtGuard)
  public async update(
    @Param('variationItemId', ParseIntPipe) variationItemId: number,
    @Body(ValidationPipe) updateVariationItemDto: UpdateVariationItemDto,
  ): Promise<VariationItemModel> {
    return this.updateVariationItemUseCase.run(
      variationItemId,
      updateVariationItemDto,
    );
  }

  @Delete(':variationItemId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeleteVariationItemPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(DeleteVariationItemPresenter))
  @UseGuards(JwtGuard)
  public async deleteById(
    @Param('variationItemId', ParseIntPipe) variationItemId: number,
  ): Promise<VariationItemModel> {
    return this.deleteVariationItemByIdUseCase.run(variationItemId);
  }
}
