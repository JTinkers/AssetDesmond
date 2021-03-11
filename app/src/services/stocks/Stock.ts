import IStock from './interfaces/IStock';

class Stock implements IStock {
    public name = '';
    public symbol = '';
    public price = 0;
}

export default Stock;