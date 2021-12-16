import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginatematerial'
})
export class PaginatematerialPipe implements PipeTransform {

  transform(array: any[], page_size: any, pagen_number:number): any[] {
    if (!array.length) {
      return [];
    }
    if (page_size==="all") {
      return array;
    }
    page_size=page_size||5;
    pagen_number=pagen_number||1;
   return array.slice(pagen_number* page_size,(pagen_number+1)*page_size)
  }

}
