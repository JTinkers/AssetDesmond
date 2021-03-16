import IStock from '@/services/stocks/interfaces/IStock';
import IStockChartPoint from '@/services/stocks/interfaces/IStockChartPoint';

class FinnhubStock implements IStock {
    name = '';
    symbol = '';
    price = 0;
    chartData = Array<IStockChartPoint>();
    open = 0;
    close = 0;
    low = 0;
    high = 0;
    lastRefresh = 0;
}

export default FinnhubStock;