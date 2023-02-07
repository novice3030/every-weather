import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment',
  pure: false,
})
export class MomentPipe implements PipeTransform {
  transform(date: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return moment(date).format(format);
  }
}
