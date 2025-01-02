import { Provider } from '@nestjs/common';
import { CreateVariationTypeProxy } from './create-variation-type.proxy';
import { FindAllVariationTypesProxy } from './find-all-variation-types.proxy';
import { FindVariationTypeByIdProxy } from './find-variation-type-by-id.proxy';
import { UpdateVariationTypeProxy } from './update-variation-type.proxy';
import { DeleteVariationTypeByIdProxy } from './delete-variation-type-by-id.proxy';

export const VariationTypeProxy: Map<symbol, Provider> = new Map([
  CreateVariationTypeProxy.Entry,
  FindAllVariationTypesProxy.Entry,
  FindVariationTypeByIdProxy.Entry,
  UpdateVariationTypeProxy.Entry,
  DeleteVariationTypeByIdProxy.Entry,
]);
