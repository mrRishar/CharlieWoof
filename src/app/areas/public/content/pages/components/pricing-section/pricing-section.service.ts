import { Model } from './pricing-section.model';

export class DataService {

    private data: Model[] = [
        { name: "Йоркширський Тер’єр", price: 350, pricesecond: 250 },
        { name: "Шпіц", price: 350, pricesecond: 300 },
        { name: "Мальтійська болонка", price: 350, pricesecond: 250 },
        { name: "Ши-тцу", price: 400, pricesecond: 350 },
        { name: "Вест хайленд- уайт тер’єр", price: 400, pricesecond: 350 },
        { name: "Бішон", price: 400, pricesecond: 300 },
        { name: "Цвергшнауцер", price: 400, pricesecond: 300 },
        { name: "Китайська хохлата пухова", price: 350, pricesecond: null },
        { name: "Китайська хохлата гола", price: 300, pricesecond: null },
        { name: "Пікінес", price: 300, pricesecond: null },
        { name: "Той-пудель", price: 350, pricesecond: null },
        { name: "Карликовий пудель", price: null, pricesecond: null },
        { name: "Годен Ретрівер ", price: null, pricesecond: null },
    ];
    getData(): Model[] {

        return this.data;
    }
    addData(name: string, price: number, pricesecond: number) {

        this.data.push(new Model(name, price, pricesecond));
    }
}