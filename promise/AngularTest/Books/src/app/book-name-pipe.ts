import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookName',
})
export class BookNamePipe implements PipeTransform {

  transform(value: string): string {
    return `The name of the book is : ${value.toUpperCase()}`;
  }
}
