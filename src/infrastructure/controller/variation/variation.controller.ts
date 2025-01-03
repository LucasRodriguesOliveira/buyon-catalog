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
import { CreateVariationProxy } from 'src/infrastructure/usecase-proxy/proxies/variation/create-variation.proxy';
import { CreateVariationUseCase } from 'src/usecases/variation/create-variation.usecase';
import { CreateVariationPresenter } from './presenter/create-variation.presenter';
import { JwtGuard } from 'src/infrastructure/common/guard/jwt.guard';
import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
import { CreateVariationDto } from './dto/create-variation.dto';
import { VariationModel } from 'src/domain/model/variation.model';
import { FindAllVariationsProxy } from 'src/infrastructure/usecase-proxy/proxies/variation/find-all-variations.proxy';
import { FindAllVariationsUseCase } from 'src/usecases/variation/find-all-variations.usecase';
import { ListVariationPresenter } from './presenter/list-variation.presenter';
import { FindVariationByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/variation/find-variation-by-id.proxy';
import { FindVariationByIdUseCase } from 'src/usecases/variation/find-variation-by-id.usecase';
import { UpdateVariationProxy } from 'src/infrastructure/usecase-proxy/proxies/variation/update-variation.proxy';
import { UpdateVariationUseCase } from 'src/usecases/variation/update-variation.usecase';
import { DeleteVariationByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/variation/delete-variation-by-id.proxy';
import { DeleteVariationByIdUseCase } from 'src/usecases/variation/delete-variation-by-id.usecase';
import { FindVariationByIdPresenter } from './presenter/find-variation-by-id.presenter';
import { UpdateVariationPresenter } from './presenter/update-variation.presenter';
import { UpdateVariationDto } from './dto/update-variation.dto';
import { DeleteVariationByIdPresenter } from './presenter/delete-variation.presenter';

@Controller('variation')
@ApiTags('Variation')
export class VariationController {
  constructor(
    @Inject(CreateVariationProxy.Token)
    private readonly createVariationUseCase: CreateVariationUseCase,
    @Inject(FindAllVariationsProxy.Token)
    private readonly findAllVariationsUseCase: FindAllVariationsUseCase,
    @Inject(FindVariationByIdProxy.Token)
    private readonly findVariationByIdUseCase: FindVariationByIdUseCase,
    @Inject(UpdateVariationProxy.Token)
    private readonly updateVariationUseCase: UpdateVariationUseCase,
    @Inject(DeleteVariationByIdProxy.Token)
    private readonly deleteVariationByIdUseCase: DeleteVariationByIdUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [ListVariationPresenter],
  })
  @UseGuards(JwtGuard)
  @UseInterceptors(new PresenterInterceptor(ListVariationPresenter))
  public async list(): Promise<VariationModel[]> {
    return this.findAllVariationsUseCase.run();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreateVariationPresenter,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseInterceptors(new PresenterInterceptor(CreateVariationPresenter))
  public async create(
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    createVariationDto: CreateVariationDto,
  ): Promise<VariationModel> {
    return this.createVariationUseCase.run(createVariationDto);
  }

  @Get(':variationId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindVariationByIdPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(FindVariationByIdPresenter))
  @UseGuards(JwtGuard)
  public async find(
    @Param('variationId', ParseIntPipe) variationId: number,
  ): Promise<VariationModel> {
    return this.findVariationByIdUseCase.run(variationId);
  }

  @Put(':variationId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateVariationPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(UpdateVariationPresenter))
  @UseGuards(JwtGuard)
  public async update(
    @Param('variationId', ParseIntPipe) variationId: number,
    @Body(ValidationPipe) updateVariationDto: UpdateVariationDto,
  ): Promise<VariationModel> {
    return this.updateVariationUseCase.run(variationId, updateVariationDto);
  }

  @Delete(':variationId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeleteVariationByIdPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(DeleteVariationByIdPresenter))
  @UseGuards(JwtGuard)
  public async deleteById(
    @Param('variationId', ParseIntPipe) variationId: number,
  ): Promise<VariationModel> {
    return this.deleteVariationByIdUseCase.run(variationId);
  }
}
