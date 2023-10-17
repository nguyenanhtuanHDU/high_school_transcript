import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hiddenString'
})
export class HiddenStringPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const valueSplit = value.slice(0, 2);
    return valueSplit + "*******";
  }

}
