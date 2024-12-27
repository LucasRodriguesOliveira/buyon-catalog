import { Provider } from '@nestjs/common';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { LoginUseCase } from 'src/usecases/auth/login.usecase';
import { LocalStrategy } from './local.strategy';
import { ILogger } from 'src/domain/logger/logger.interface';
import { LoginProxy } from 'src/infrastructure/usecase-proxy/proxies/auth/login-usecase.proxy';

export const LocalStrategyProvider: Provider = {
  inject: [LoginProxy.Token, HttpExceptionService, LoggerService],
  provide: LocalStrategy,
  useFactory: (
    loginUseCase: LoginUseCase,
    exceptionService: HttpExceptionService,
    logger: ILogger,
  ) => new LocalStrategy(loginUseCase, exceptionService, logger),
};
