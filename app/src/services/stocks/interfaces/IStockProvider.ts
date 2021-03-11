import IStock from './IStock';
import IStockProviderConfig from './IStockProviderConfig';

interface IStockProvider {
    config: IStockProviderConfig;
    stocks: IStock[];

    fetch(symbols: string[]) : IStock[];
}

export default IStockProvider;