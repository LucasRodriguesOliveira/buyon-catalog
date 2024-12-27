import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionService } from 'src/infrastructure/http-exception/http-exception.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { LoginProxy } from 'src/infrastructure/usecase-proxy/proxies/auth/login-usecase.proxy';
import { JwtStrategy } from './jwt.strategy';
import { LoginUseCase } from 'src/usecases/auth/login.usecase';
import { ILogger } from 'src/domain/logger/logger.interface';

export const JwtStrategyProvider: Provider = {
  inject: [
    LoginProxy.Token,
    ConfigService,
    LoggerService,
    HttpExceptionService,
  ],
  provide: JwtStrategy,
  useFactory: (
    loginUseCase: LoginUseCase,
    configService: ConfigService,
    logger: ILogger,
    exceptionService: HttpExceptionService,
  ) => new JwtStrategy(loginUseCase, configService, logger, exceptionService),
};
