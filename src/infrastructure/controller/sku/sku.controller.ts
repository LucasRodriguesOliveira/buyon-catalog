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
import { CreateSKUProxy } from 'src/infrastructure/usecase-proxy/proxies/sku/create-sku.proxy';
import { DeleteSKUByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/sku/delete-sku-by-id.proxy';
import { FindAllSKUSProxy } from 'src/infrastructure/usecase-proxy/proxies/sku/find-all-skus.proxy';
import { FindSKUByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/sku/find-sku-by-id.proxy';
import { UpdateSKUProxy } from 'src/infrastructure/usecase-proxy/proxies/sku/update-sku.proxy';
import { CreateSKUUseCase } from 'src/usecases/sku/create-sku.usecase';
import { DeleteSKUByIdUseCase } from 'src/usecases/sku/delete-sku-by-id.usecase';
import { FindAllSKUSUseCase } from 'src/usecases/sku/find-all-skus.usecase';
import { FindSKUByIdUseCase } from 'src/usecases/sku/find-sku-by-id.usecase';
import { UpdateSKUUseCase } from 'src/usecases/sku/update-sku.usecase';
import { ListSKUsPresenter } from './presenter/list-skus.presenter';
import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
import { SKUModel } from 'src/domain/model/sku.model';
import { CreateSKUPresenter } from './presenter/create-sku.presenter';
import { JwtGuard } from 'src/infrastructure/common/guard/jwt.guard';
import { CreateSkuDto } from './dto/create-sku.dto';
import { FindSKUByIdPresenter } from './presenter/find-sku-by-id.presenter';
import { ParseBigIntPipe } from 'src/infrastructure/common/pipe/parse-bigint.pipe';
import { UpdateSkuPresenter } from './presenter/update-sku.presenter';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { DeleteSkuByIdPresenter } from './presenter/delete-sku-by-id.presenter';
import { AddVariationToSKUProxy } from 'src/infrastructure/usecase-proxy/proxies/sku/add-variation-to-sku.proxy';
import { AddVariationToSKUUseCase } from 'src/usecases/sku/add-variation-to-sku.usecase';
import { RemoveSKUVariationProxy } from 'src/infrastructure/usecase-proxy/proxies/sku/remove-sku-variation.proxy';
import { RemoveSKUVariationUseCase } from 'src/usecases/sku/remove-sku-variation.usecase';
import { CreateSKUVariationDto } from './dto/create-sku-variation.dto';
import { CreateSKUVariationPresenter } from './presenter/create-sku-variation.presenter';
import { SKUVariationModel } from 'src/domain/model/sku-variation.model';
import { DeleteSKUVariationPresenter } from './presenter/delete-sku-variation.presenter';

@Controller('sku')
@ApiTags('SKU')
export class SKUController {
  constructor(
    @Inject(CreateSKUProxy.Token)
    private readonly createSKUUseCase: CreateSKUUseCase,
    @Inject(FindAllSKUSProxy.Token)
    private readonly findAllSKUsUseCase: FindAllSKUSUseCase,
    @Inject(FindSKUByIdProxy.Token)
    private readonly findSKUByIdUseCase: FindSKUByIdUseCase,
    @Inject(UpdateSKUProxy.Token)
    private readonly updateSKUUseCase: UpdateSKUUseCase,
    @Inject(DeleteSKUByIdProxy.Token)
    private readonly deleteSKUByIdUseCase: DeleteSKUByIdUseCase,
    @Inject(AddVariationToSKUProxy.Token)
    private readonly addVariationToSKUUseCase: AddVariationToSKUUseCase,
    @Inject(RemoveSKUVariationProxy.Token)
    private readonly removeSKUVariationUseCase: RemoveSKUVariationUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [ListSKUsPresenter],
  })
  @UseInterceptors(new PresenterInterceptor(ListSKUsPresenter))
  public async list(): Promise<SKUModel[]> {
    return this.findAllSKUsUseCase.run();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreateSKUPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(CreateSKUPresenter))
  @UseGuards(JwtGuard)
  public async create(
    @Body(ValidationPipe) createSKUDto: CreateSkuDto,
  ): Promise<SKUModel> {
    return this.createSKUUseCase.run(createSKUDto);
  }

  @Get(':skuId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindSKUByIdPresenter,
  })
  @UseInterceptors(new PresenterInterceptor(FindSKUByIdPresenter))
  public async find(
    @Param('skuId', ParseBigIntPipe) skuId: bigint,
  ): Promise<SKUModel> {
    return this.findSKUByIdUseCase.run(skuId);
  }

  @Put(':skuId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateSkuPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(UpdateSkuPresenter))
  @UseGuards(JwtGuard)
  public async update(
    @Param('skuId', ParseBigIntPipe) skuId: bigint,
    @Body(ValidationPipe) updateSKuDto: UpdateSkuDto,
  ): Promise<SKUModel> {
    return this.updateSKUUseCase.run(skuId, updateSKuDto);
  }

  @Delete(':skuId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeleteSkuByIdPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(DeleteSkuByIdPresenter))
  @UseGuards(JwtGuard)
  public async deleteById(
    @Param('skuId', ParseBigIntPipe) skuId: bigint,
  ): Promise<SKUModel> {
    return this.deleteSKUByIdUseCase.run(skuId);
  }

  @Post(':skuId')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreateSKUVariationPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(CreateSKUVariationPresenter))
  @UseGuards(JwtGuard)
  public async addVariation(
    @Param('skuId', ParseBigIntPipe) skuId: bigint,
    @Body(ValidationPipe) createSKUVariationDto: CreateSKUVariationDto,
  ): Promise<SKUVariationModel> {
    return this.addVariationToSKUUseCase.run({
      ...createSKUVariationDto,
      skuId,
    });
  }

  @Delete(':skuId/:variationId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeleteSKUVariationPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(DeleteSkuByIdPresenter))
  @UseGuards(JwtGuard)
  public async removeVariation(
    @Param('skuId', ParseBigIntPipe) skuId: bigint,
    @Param('variationId', ParseBigIntPipe) variationId: bigint,
  ): Promise<SKUVariationModel> {
    return this.removeSKUVariationUseCase.run(skuId, variationId);
  }
}
