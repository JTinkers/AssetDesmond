import IStock from './IStock'

interface IStockDataProvider {
    fetch(symbols: string[]): IStock[];
}

export default IStockDataProvider