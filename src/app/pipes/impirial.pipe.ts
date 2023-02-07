import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'impirial',
})
export class ImpirialPipe implements PipeTransform {
    transform(value: number, active: boolean): string {
        if (active) {
            return Math.floor((value * 9) / 5 + 32) + '\u00B0';
        }
        return Math.floor(value) + '\u00B0';
    }
}
