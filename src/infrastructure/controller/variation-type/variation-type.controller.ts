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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVariationTypeProxy } from 'src/infrastructure/usecase-proxy/proxies/variation-type/create-variation-type.proxy';
import { CreateVariationTypeUseCase } from 'src/usecases/variation-type/create-variation-type.usecase';
import { CreateVariationTypePresenter } from './presenter/create-variation-type.presenter';
import { JwtGuard } from 'src/infrastructure/common/guard/jwt.guard';
import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
import { CreateVariationTypeDto } from './dto/create-variation-type.dto';
import { VariationType } from 'src/domain/model/variation-type.model';
import { FindAllVariationTypesProxy } from 'src/infrastructure/usecase-proxy/proxies/variation-type/find-all-variation-types.proxy';
import { FindAllVariationTypesUseCase } from 'src/usecases/variation-type/find-all-variation-types.usecase';
import { ListVariationTypePresenter } from './presenter/list-variation-type.presenter';
import { FindVariationTypeByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/variation-type/find-variation-type-by-id.proxy';
import { FindVariationTypeByIdUseCase } from 'src/usecases/variation-type/find-variation-type-by-id.usecase';
import { UpdateVariationTypeProxy } from 'src/infrastructure/usecase-proxy/proxies/variation-type/update-variation-type.proxy';
import { UpdateVariationTypeUseCase } from 'src/usecases/variation-type/update-variation-type.usecase';
import { DeleteVariationTypeByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/variation-type/delete-variation-type-by-id.proxy';
import { DeleteVariationTypeByIdUseCase } from 'src/usecases/variation-type/delete-variation-type-by-id.usecase';
import { FindVariationTypeByIdPresenter } from './presenter/find-variation-type-by-id.presenter';
import { UpdateVariationTypePresenter } from './presenter/update-variation-type.presenter';
import { UpdateVariationTypeDto } from './dto/update-variation-type.dto';
import { DeleteVariationTypeByIdPresenter } from './presenter/delete-variation-type.presenter';

@Controller('variation-type')
@ApiTags('VariationType')
export class VariationTypeController {
  constructor(
    @Inject(CreateVariationTypeProxy.Token)
    private readonly createVariationTypeUseCase: CreateVariationTypeUseCase,
    @Inject(FindAllVariationTypesProxy.Token)
    private readonly findAllVariationTypesUseCase: FindAllVariationTypesUseCase,
    @Inject(FindVariationTypeByIdProxy.Token)
    private readonly findVariationTypeByIdUseCase: FindVariationTypeByIdUseCase,
    @Inject(UpdateVariationTypeProxy.Token)
    private readonly updateVariationTypeUseCase: UpdateVariationTypeUseCase,
    @Inject(DeleteVariationTypeByIdProxy.Token)
    private readonly deleteVariationTypeByIdUseCase: DeleteVariationTypeByIdUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [ListVariationTypePresenter],
  })
  @UseGuards(JwtGuard)
  @UseInterceptors(new PresenterInterceptor(ListVariationTypePresenter))
  public async list(): Promise<VariationType[]> {
    return this.findAllVariationTypesUseCase.run();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreateVariationTypePresenter,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseInterceptors(new PresenterInterceptor(CreateVariationTypePresenter))
  public async create(
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    createVariationTypeDto: CreateVariationTypeDto,
  ): Promise<VariationType> {
    return this.createVariationTypeUseCase.run(createVariationTypeDto);
  }

  @Get(':variationTypeId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindVariationTypeByIdPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(FindVariationTypeByIdPresenter))
  @UseGuards(JwtGuard)
  public async find(
    @Param('variationTypeId', ParseIntPipe) variationTypeId: number,
  ): Promise<VariationType> {
    return this.findVariationTypeByIdUseCase.run(variationTypeId);
  }

  @Put(':variationTypeId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateVariationTypePresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(UpdateVariationTypePresenter))
  @UseGuards(JwtGuard)
  public async update(
    @Param('variationTypeId', ParseIntPipe) variationTypeId: number,
    @Body(ValidationPipe) updateVariationTypeDto: UpdateVariationTypeDto,
  ): Promise<VariationType> {
    return this.updateVariationTypeUseCase.run(
      variationTypeId,
      updateVariationTypeDto,
    );
  }

  @Delete(':variationTypeId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeleteVariationTypeByIdPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(DeleteVariationTypeByIdPresenter))
  @UseGuards(JwtGuard)
  public async deleteById(
    @Param('variationTypeId', ParseIntPipe) variationTypeId: number,
  ): Promise<VariationType> {
    return this.deleteVariationTypeByIdUseCase.run(variationTypeId);
  }
}
