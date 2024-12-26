import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './infrastructure/config/env/env.config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './infrastructure/config/pino/pino.config';
import { ControllerModule } from './infrastructure/controller/controller.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    PrismaModule,
    LoggerModule.forRootAsync(pinoConfig()),
    ControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
