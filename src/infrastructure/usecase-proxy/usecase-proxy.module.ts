import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RepositoryModule } from '../repository/repository.module';
import { ProductProxies } from './proxies/product/product.proxy';
import { UserProxies } from './proxies/user/user.proxy';
import { AuthProxy } from './proxies/auth/auth.proxy';
import { BcryptModule } from '../service/bcrypt/bcrypt.module';
import { JwtTokenModule } from '../service/jwt/jwt.module';
import { CategoryProxy } from './proxies/category/category.proxy';
import { UserProductProxy } from './proxies/user-product/user-product.proxy';

@Module({
  imports: [LoggerModule, RepositoryModule, BcryptModule, JwtTokenModule],
})
export class UseCaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [
        ...ProductProxies.values(),
        ...UserProxies.values(),
        ...AuthProxy.values(),
        ...CategoryProxy.values(),
        ...UserProductProxy.values(),
      ],
      exports: [
        ...ProductProxies.keys(),
        ...UserProxies.keys(),
        ...AuthProxy.keys(),
        ...CategoryProxy.keys(),
        ...UserProductProxy.keys(),
      ],
    };
  }
}
