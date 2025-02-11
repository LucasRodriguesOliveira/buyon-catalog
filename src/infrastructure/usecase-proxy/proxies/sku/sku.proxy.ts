import { Provider } from '@nestjs/common';
import { CreateSKUProxy } from './create-sku.proxy';
import { FindAllSKUSProxy } from './find-all-skus.proxy';
import { FindSKUByIdProxy } from './find-sku-by-id.proxy';
import { UpdateSKUProxy } from './update-sku.proxy';
import { DeleteSKUByIdProxy } from './delete-sku-by-id.proxy';
import { AddVariationToSKUProxy } from './add-variation-to-sku.proxy';
import { RemoveSKUVariationProxy } from './remove-sku-variation.proxy';

export const SKUProxy: Map<symbol, Provider> = new Map([
  CreateSKUProxy.Entry,
  FindAllSKUSProxy.Entry,
  FindSKUByIdProxy.Entry,
  UpdateSKUProxy.Entry,
  DeleteSKUByIdProxy.Entry,
  AddVariationToSKUProxy.Entry,
  RemoveSKUVariationProxy.Entry,
]);
