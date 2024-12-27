import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { ProductController } from './product/product.controller';
import { HttpExceptionModule } from '../http-exception/http-exception.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UseCaseProxyModule.register(), HttpExceptionModule],
  controllers: [ProductController, UserController, AuthController],
})
export class ControllerModule {}
