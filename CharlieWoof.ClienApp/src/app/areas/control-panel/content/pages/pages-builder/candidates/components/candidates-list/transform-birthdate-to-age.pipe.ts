import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transformBirthDateToAge' })
export class TransformBirthDateToAgePipe implements PipeTransform {
    transform(value: string): number {
        const birthday = new Date(value);
        const today = new Date();
        let years = today.getFullYear() - birthday.getFullYear();

        birthday.setFullYear(today.getFullYear());

        if (today < birthday) {
            years--;
        }
        return years;
    }
}
