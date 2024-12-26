import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { ProductController } from './product/product.controller';
import { HttpExceptionModule } from '../http-exception/http-exception.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [UseCaseProxyModule.register(), HttpExceptionModule],
  controllers: [ProductController, UserController],
})
export class ControllerModule {}
