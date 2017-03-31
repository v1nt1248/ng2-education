import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: app.Contact[], query: string): app.Contact[] {
    if (!query) {
      return value;
    } else {
      return value.filter((item: app.Contact) => {
        const fio = `${item.firstName}${item.middleName}${item.lastName}`;
        return fio.toLocaleLowerCase().includes(query.toLocaleLowerCase());
      });
    }
  }

}
