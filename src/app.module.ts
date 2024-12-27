import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './infrastructure/config/env/env.config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './infrastructure/config/pino/pino.config';
import { ControllerModule } from './infrastructure/controller/controller.module';
import { JwtModule } from '@nestjs/jwt';
import { tokenConfig } from './infrastructure/config/token/token.config';
import { UseCaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { HttpExceptionModule } from './infrastructure/http-exception/http-exception.module';
import { LoggerModule as CustomLoggerModule } from './infrastructure/logger/logger.module';
import { LocalStrategyProvider } from './infrastructure/common/strategy/local/local.provider';
import { JwtStrategyProvider } from './infrastructure/common/strategy/jwt/jwt.provider';

@Module({
  imports: [
    JwtModule.registerAsync(tokenConfig()),
    ConfigModule.forRoot(envConfig),
    PrismaModule,
    LoggerModule.forRootAsync(pinoConfig()),
    ControllerModule,
    UseCaseProxyModule.register(),
    HttpExceptionModule,
    CustomLoggerModule,
  ],
  providers: [LocalStrategyProvider, JwtStrategyProvider],
})
export class AppModule {}
