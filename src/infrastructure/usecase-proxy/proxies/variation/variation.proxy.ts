import { Provider } from '@nestjs/common';
import { CreateVariationProxy } from './create-variation.proxy';
import { FindAllVariationsProxy } from './find-all-variations.proxy';
import { FindVariationByIdProxy } from './find-variation-by-id.proxy';
import { UpdateVariationProxy } from './update-variation.proxy';
import { DeleteVariationByIdProxy } from './delete-variation-by-id.proxy';

export const VariationProxy: Map<symbol, Provider> = new Map([
  CreateVariationProxy.Entry,
  FindAllVariationsProxy.Entry,
  FindVariationByIdProxy.Entry,
  UpdateVariationProxy.Entry,
  DeleteVariationByIdProxy.Entry,
]);
