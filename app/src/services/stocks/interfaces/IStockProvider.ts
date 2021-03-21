import IStock from './IStock';
import IStockProviderConfig from './IStockProviderConfig';

interface IStockProvider {
    name: string;
    config: IStockProviderConfig;
    stocks: IStock[];

    fetch(symbols: string[]): Promise<IStock[]>;
}

export default IStockProvider;