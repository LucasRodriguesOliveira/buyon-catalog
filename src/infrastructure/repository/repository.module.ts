import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  providers: [ProductRepository, UserRepository],
  exports: [ProductRepository, UserRepository],
})
export class RepositoryModule {}
