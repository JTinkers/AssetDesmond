import IStockProvider from '@/services/stocks/interfaces/IStockProvider';
import Stock from '@/services/stocks/Stock';
import FinnhubStockProviderConfig from './FinnhubStockProviderConfig';
import axios from 'axios';
import { reactive } from 'vue';

class FinnhubStockProvider implements IStockProvider {
    public config: FinnhubStockProviderConfig;
    public stocks: Stock[];
    
    public isSocketOpen = false;

    constructor(config: FinnhubStockProviderConfig) {
        this.config = config;
        this.stocks = reactive([]);
    }

    public async fetchInfo(symbols: string[]) {
        // build list of stocks
        symbols.forEach(symbol => {
            const stock: Stock = new Stock();
            stock.symbol = symbol;

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
                stock.openPrice = info.o;
            }
        });
    }

    public fetch(symbols: string[]): Stock[] {
        if(!this.isSocketOpen) {
            this.fetchInfo(symbols);
            this.setupListener(symbols);
        }

        // temporary randomizer
        setInterval(() => {
            const change = ((Math.random() * 4) - 2) * 0.01;
            const stock = this.stocks[Math.floor(Math.random() * this.stocks.length)];
    
            stock.price += stock.price * change;
        }, 1000);

        return this.stocks;
    }

    public setupListener(symbols: string[]) {
        const socket = new WebSocket('wss://ws.finnhub.io?token=' + this.config.apiKey);

        socket.onopen = () => {
            symbols.forEach(x => {
                socket.send(JSON.stringify(
                {
                    type: 'subscribe',
                    symbol: x
                }));
            });
        };

        socket.onmessage = (e: MessageEvent) => {
            const result = JSON.parse(e.data);
        
            if(result.type != 'trade')
                return;

            const trades: any[] = result.data;

            trades.forEach(trade => {
                const stock: Stock | undefined = this.stocks.find(x => x.symbol == trade.s);

                if(!stock)
                    return;

                stock.price = trade.p;
            });
        };

        this.isSocketOpen = true;
    }
}

export default FinnhubStockProvider;