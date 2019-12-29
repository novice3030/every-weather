import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impirial'
})
export class ImpirialPipe implements PipeTransform {

  transform(value: number, active: boolean): number {
    if(active) {
      return ((value * 9)/5) + 32;
    }
    return value;
  }

}
