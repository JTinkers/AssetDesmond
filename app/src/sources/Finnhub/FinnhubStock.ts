import IStock from '@/services/stocks/interfaces/IStock';

class FinnhubStock implements IStock {
    name = '';
    symbol = '';
    price = 0;
    prices = Array<number>();
    open = 0;
    close = 0;
    low = 0;
    high = 0;
    lastRefresh = 0;
}

export default FinnhubStock;