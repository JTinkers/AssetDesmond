import IStock from '@/services/stocks/interfaces/IStock';
import IStockHistory from '@/services/stocks/interfaces/IStockHistory';

class FinnhubStock implements IStock {
    name = '';
    symbol = '';
    price = 0;
    history = Array<IStockHistory>();
    open = 0;
    close = 0;
    low = 0;
    high = 0;
    lastRefresh = 0;
}

export default FinnhubStock;