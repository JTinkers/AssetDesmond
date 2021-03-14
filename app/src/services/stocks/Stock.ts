import IStock from './interfaces/IStock';

class Stock implements IStock {
    public name = '';
    public symbol = '';
    public price = 0;
    public openPrice = 0;
    public prices = Array<number>();
}

export default Stock;