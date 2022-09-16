import { Pipe, PipeTransform } from '@angular/core';
import { NGB_DATEPICKER_18N_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-i18n';

@Pipe({
  name: 'sortPortOrden'
})
export class SortPortOrdenPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.sort((a, b) => { return a.posicion - b.posicion; });
  }

}
