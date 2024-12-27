import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
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
import { CreateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/create-user.proxy';
import { CreateUserUseCase } from 'src/usecases/user/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from 'src/domain/model/user.model';
import { CreateUserPresenter } from './presenter/create-user.presenter';
import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
import { ListUsersPresenter } from './presenter/list-users.presenter';
import { ListUsersProxy } from 'src/infrastructure/usecase-proxy/proxies/user/list-users.proxy';
import { ListUsersUseCase } from 'src/usecases/user/list-users.usecase';
import { FindUserByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/user/find-user-by-id.proxy';
import { FindUserByIdUseCase } from 'src/usecases/user/find-user-by-id.usecase';
import { UpdateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/update-user.proxy';
import { UpdateUserUseCase } from 'src/usecases/user/update-user.usecase';
import { DeleteUserByIdProxy } from 'src/infrastructure/usecase-proxy/proxies/user/delete-user-by-id.proxy';
import { DeleteUserByIdUseCase } from 'src/usecases/user/delete-user-by-id.usecase';
import { FindUserByIdPresenter } from './presenter/find-user-by-id.presenter';
import { UpdateUserPresenter } from './presenter/update-user.presenter';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserByIdPresenter } from './presenter/delete-user-by-id.presenter';
import { JwtGuard } from 'src/infrastructure/common/guard/jwt.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject(CreateUserProxy.Token)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(ListUsersProxy.Token)
    private readonly listUsersUseCase: ListUsersUseCase,
    @Inject(FindUserByIdProxy.Token)
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(UpdateUserProxy.Token)
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject(DeleteUserByIdProxy.Token)
    private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreateUserPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(CreateUserPresenter))
  @UseGuards(JwtGuard)
  public async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserModel> {
    return this.createUserUseCase.run(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [ListUsersPresenter],
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(ListUsersPresenter))
  @UseGuards(JwtGuard)
  public async list(): Promise<UserModel[]> {
    return this.listUsersUseCase.run();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FindUserByIdPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(FindUserByIdPresenter))
  @UseGuards(JwtGuard)
  public async findById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserModel> {
    return this.findUserByIdUseCase.run(userId);
  }

  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateUserPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(UpdateUserPresenter))
  @UseGuards(JwtGuard)
  public async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.updateUserUseCase.run(userId, updateUserDto);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeleteUserByIdPresenter,
  })
  @ApiBearerAuth()
  @UseInterceptors(new PresenterInterceptor(DeleteUserByIdPresenter))
  @UseGuards(JwtGuard)
  public async deleteById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserModel> {
    return this.deleteUserByIdUseCase.run(userId);
  }
}
