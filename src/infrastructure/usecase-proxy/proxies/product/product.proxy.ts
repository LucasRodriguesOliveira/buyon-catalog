import { CreateProductProxy } from './create-product.proxy';
import { Provider } from '@nestjs/common';
import { FindProductByIdProxy } from './find-product-by-id.proxy';
import { ListProductsProxy } from './list-products.proxy';
import { UpdateProductByIdProxy } from './update-product-by-id.proxy';
import { DeleteProductByIdProxy } from './delete-product-by-id.proxy';

export const ProductProxies: Map<symbol, Provider> = new Map([
  CreateProductProxy.Entry,
  FindProductByIdProxy.Entry,
  ListProductsProxy.Entry,
  UpdateProductByIdProxy.Entry,
  DeleteProductByIdProxy.Entry,
]);
