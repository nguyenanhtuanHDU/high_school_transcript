import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): unknown {
    let timeAgo;
    if (value) {
      timeAgo = formatDistanceToNow(new Date(value), {
        addSuffix: true,
        includeSeconds: true,
      });
    }
    return timeAgo;
  }
}
