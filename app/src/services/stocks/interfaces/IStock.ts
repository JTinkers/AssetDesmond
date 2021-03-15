interface IStock {
    name: string;
    symbol: string;
    price: number;
    prices: Array<number>;
    open: number;
    close: number;
    low: number;
    high: number;
}

export default IStock;