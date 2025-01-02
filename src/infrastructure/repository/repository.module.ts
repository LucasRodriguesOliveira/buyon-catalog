import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { UserRepository } from './user.repository';
import { CategoryRepository } from './category.repository';
import { UserProductRepository } from './user-product.repository';
import { VariationTypeRepository } from './variation-type.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    ProductRepository,
    UserRepository,
    CategoryRepository,
    UserProductRepository,
    VariationTypeRepository,
  ],
  exports: [
    ProductRepository,
    UserRepository,
    CategoryRepository,
    UserProductRepository,
    VariationTypeRepository,
  ],
})
export class RepositoryModule {}
