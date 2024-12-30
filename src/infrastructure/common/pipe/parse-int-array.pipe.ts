import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntArrayPipe implements PipeTransform<string[], number[]> {
  transform(value: string[]) {
    if (Array.isArray(value)) {
      return value.map((v) => +v);
    }

    if (typeof value === 'string') {
      return [parseInt(value, 10)];
    }

    return [];
  }
}
