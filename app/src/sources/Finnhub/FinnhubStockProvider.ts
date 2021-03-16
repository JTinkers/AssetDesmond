import IStockProvider from '@/services/stocks/interfaces/IStockProvider';
import IStockChartPoint from '@/services/stocks/interfaces/IStockChartPoint';
import IStock from '@/services/stocks/interfaces/IStock';
import FinnhubStockProviderConfig from './FinnhubStockProviderConfig';
import FinnhubStock from './FinnhubStock';
import axios from 'axios';
import { format } from 'date-fns';
import '@/extensions/Array';

class FinnhubStockProvider implements IStockProvider {
    public config: FinnhubStockProviderConfig;
    public stocks: FinnhubStock[];
    
    public isSocketOpen = false;

    constructor(config: FinnhubStockProviderConfig) {
        this.config = config;
        this.stocks = [];
    }

    public async fetchInfo(symbols: string[]) {
        // build list of stocks
        symbols.forEach(symbol => {
            const stock: FinnhubStock = new FinnhubStock();
            stock.symbol = symbol;
            stock.chartData = Array<IStockChartPoint>();

            this.stocks.push(stock);
        });

        // fetch all US stocks
        const result: any[] = (await axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${this.config.apiKey}`)).data;
        
        // assign data regarding stocks
        this.stocks.forEach(stock => {
            const info = result.find((x: any) => x.symbol == stock.symbol);

            if(info)
                stock.name = info.description;
        });

        // fetch stock quote for each stock
        this.stocks.forEach(async stock => {
            const info = (await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${this.config.apiKey}`)).data;

            if(info) {
                stock.price = info.c;
                stock.open = info.o;
                stock.close = info.pc;
                stock.low = info.l;
                stock.high = info.h;
            }
        });
    }

    public async fetch(symbols: string[]): Promise<IStock[]> {
        if(!this.isSocketOpen) {
            await this.fetchInfo(symbols);

            if(!this.config.useRandomizer)
                this.setupListener(symbols);
        }

        if(this.config.useRandomizer) {
            setInterval(() => {
                const change = ((Math.random() * 4) - 2) * 0.01;
                const stock = this.stocks[Math.floor(Math.random() * this.stocks.length)];
        
                stock.price += stock.price * change;

                const chartPoint: IStockChartPoint = {
                    x: stock.price,
                    y: format(new Date().getTime(), 'HH:mm:ss')
                };

                stock.chartData.push(chartPoint);
            }, 250);
        }

        return this.stocks;
    }

    public setupListener(symbols: string[]) {
        const socket = new WebSocket('wss://ws.finnhub.io?token=' + this.config.apiKey);

        socket.onopen = () => {
            symbols.forEach(x => {
                socket.send(JSON.stringify({
                    type: 'subscribe',
                    symbol: x
                }));
            });
        };

        socket.onmessage = (e: MessageEvent) => {
            const result = JSON.parse(e.data);
        
            if(result.type != 'trade')
                return;

            const groups = result.data.groupBy('s');

            this.stocks.forEach(stock => {
                const trades: any[] = groups[stock.symbol];

                if(!trades)
                    return;

                const latest = trades.sort((a, b) => b.t - a.t)[0];
                
                if(latest.t < stock.lastRefresh + (this.config.refreshRate || 0))
                    return;

                const chartPoint: IStockChartPoint = {
                    x: latest.p,
                    y: format(new Date(latest.t), 'HH:mm:ss')
                };

                stock.chartData.push(chartPoint);

                stock.price = latest.p;
                stock.lastRefresh = latest.t;
            });
        };

        this.isSocketOpen = true;
    }
}

export default FinnhubStockProvider;