import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RepositoryModule } from '../repository/repository.module';
import { ProductProxies } from './proxies/product/product.proxy';
import { UserProxies } from './proxies/user/user.proxy';

@Module({
  imports: [LoggerModule, RepositoryModule],
})
export class UseCaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [...ProductProxies.values(), ...UserProxies.values()],
      exports: [...ProductProxies.keys(), ...UserProxies.keys()],
    };
  }
}
