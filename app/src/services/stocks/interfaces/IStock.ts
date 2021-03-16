import IStockHistory from "./IStockHistory";

interface IStock {
    name: string;
    symbol: string;
    price: number;
    history: Array<IStockHistory>;
    open: number;
    close: number;
    low: number;
    high: number;
}

export default IStock;