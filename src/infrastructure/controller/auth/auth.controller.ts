import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request as IRequest } from 'express';
import { LocalGuard } from 'src/infrastructure/common/guard/local.guard';
import { LoginProxy } from 'src/infrastructure/usecase-proxy/proxies/auth/login-usecase.proxy';
import { LoginUseCase } from 'src/usecases/auth/login.usecase';
import { LoginPresenter } from './presenter/login.presenter';
import { RegisterPresenter } from './presenter/register.presenter';
import { PresenterInterceptor } from 'src/infrastructure/common/interceptor/presenter.interceptor';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateUserProxy } from 'src/infrastructure/usecase-proxy/proxies/user/create-user.proxy';
import { CreateUserUseCase } from 'src/usecases/user/create-user.usecase';
import { plainToInstance } from 'class-transformer';
import { CreateUserPresenter } from '../user/presenter/create-user.presenter';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(LoginProxy.Token)
    private readonly loginUseCase: LoginUseCase,
    @Inject(CreateUserProxy.Token)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPresenter,
  })
  public async login(@Request() req: IRequest): Promise<LoginPresenter> {
    return {
      access_token: await this.loginUseCase.login(req.user),
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: RegisterPresenter,
  })
  @UseInterceptors(new PresenterInterceptor(RegisterPresenter))
  public async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user = await this.createUserUseCase.run(createUserDto);
    const access_token = await this.loginUseCase.login(user);

    return {
      user: plainToInstance(CreateUserPresenter, user),
      access_token,
    };
  }
}
