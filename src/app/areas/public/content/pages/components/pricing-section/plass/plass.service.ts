import { Plass } from './pricing-section.plass';

export class PlassService {

    private data: Plass[] = [
        { name: "Підстригання кігтів", price: 30, pricesecond: null },
        { name: "Чищення вушок ", price: 40, pricesecond: null },
        { name: "Чистка зубів гелем", price: 70, pricesecond: null },
        { name: " Висртигання узорів", price: 50, pricesecond: null },
        { name: "Блиск тату", price: 50, pricesecond: null },
        { name: "Стрази на вушках ", price: 40, pricesecond: null },
        { name: "Купання шампунем проти бліх  ", price: 50, pricesecond: null },
        ];
    getData(): Plass[] {

        return this.data;
    }
    addData(name: string, price: number, pricesecond: number) {

        this.data.push(new Plass(name, price, pricesecond));
    }
}