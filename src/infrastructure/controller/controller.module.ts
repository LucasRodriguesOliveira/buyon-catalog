import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { ProductController } from './product/product.controller';
import { HttpExceptionModule } from '../http-exception/http-exception.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { CategoryController } from './category/category.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [UseCaseProxyModule.register(), HttpExceptionModule, LoggerModule],
  controllers: [
    ProductController,
    UserController,
    AuthController,
    CategoryController,
  ],
})
export class ControllerModule {}
