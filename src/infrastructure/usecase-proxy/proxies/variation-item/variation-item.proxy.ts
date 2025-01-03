import { Provider } from '@nestjs/common';
import { CreateVariationItemProxy } from './create-variation-item.proxy';
import { FindAllVariationItemsProxy } from './find-all-variation-items.proxy';
import { UpdateVariationItemProxy } from './update-variation-item.proxy';
import { DeleteVariationItemByIdProxy } from './delete-variation-item-by-id.proxy';

export const VariationItemProxy: Map<symbol, Provider> = new Map([
  CreateVariationItemProxy.Entry,
  FindAllVariationItemsProxy.Entry,
  UpdateVariationItemProxy.Entry,
  DeleteVariationItemByIdProxy.Entry,
]);
