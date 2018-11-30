import { Cats } from './pricing-section.cats';

export class CatsService {

    private data: Cats[] = [
        { name: "Стрижка кішки", price: 300, pricesecond: null },
        { name: "Вичісування кішки", price: 200, pricesecond: null },
        ];
    getData(): Cats[] {

        return this.data;
    }
    addData(name: string, price: number, pricesecond: number) {

        this.data.push(new Cats(name, price, pricesecond));
    }
}