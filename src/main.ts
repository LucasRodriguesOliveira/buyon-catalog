import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './infrastructure/config/types/app.interface';
import { APP_TOKEN } from './infrastructure/config/env/app.config';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { LoggerService } from './infrastructure/logger/logger.service';
import { SwaggerConfig } from './infrastructure/config/types/swagger.interface';
import { SWAGGER_TOKEN } from './infrastructure/config/env/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { createSwaggerDocument } from './infrastructure/config/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const { docs } = config.get<SwaggerConfig>(SWAGGER_TOKEN.description);

  SwaggerModule.setup(docs.path, app, createSwaggerDocument(app, config));

  const { port } = config.get<AppConfig>(APP_TOKEN.description);

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  await app.listen(port);
}
bootstrap();
