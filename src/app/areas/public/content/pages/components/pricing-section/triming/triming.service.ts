import { Triming } from './pricing-section.triming';

export class TrimingService {

    private data: Triming[] = [
        { name: "Джек рассел терєр", price: 450, pricesecond: null },
        { name: "Грифон", price: 450, pricesecond: null },
        { name: "Вельш терєр", price: 450, pricesecond: null },
        { name: "Фокстерєр", price: 450, pricesecond: null },
        { name: "Цвергшнауцер ", price: 450, pricesecond: null },
        { name: "Такса", price: 400, pricesecond: null },
        ];
    getData(): Triming[] {

        return this.data;
    }
    addData(name: string, price: number, pricesecond: number) {

        this.data.push(new Triming(name, price, pricesecond));
    }
}