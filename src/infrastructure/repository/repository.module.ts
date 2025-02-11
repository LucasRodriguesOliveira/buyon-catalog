import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { UserRepository } from './user.repository';
import { CategoryRepository } from './category.repository';
import { UserProductRepository } from './user-product.repository';
import { VariationRepository } from './variation.repository';
import { SKURepository } from './sku.repository';
import { VariationItemRepository } from './variation-item.repository';
import { SKUVariationRepository } from './sku-variation.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    ProductRepository,
    UserRepository,
    CategoryRepository,
    UserProductRepository,
    VariationRepository,
    VariationItemRepository,
    SKURepository,
    SKUVariationRepository,
  ],
  exports: [
    ProductRepository,
    UserRepository,
    CategoryRepository,
    UserProductRepository,
    VariationRepository,
    VariationItemRepository,
    SKURepository,
    SKUVariationRepository,
  ],
})
export class RepositoryModule {}
