import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { UserRepository } from './user.repository';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [PrismaModule],
  providers: [ProductRepository, UserRepository, CategoryRepository],
  exports: [ProductRepository, UserRepository, CategoryRepository],
})
export class RepositoryModule {}
