interface IStock {
    name: string;
    symbol: string;
    price: number;
    prices: Array<number>;
    openPrice: number;
}

export default IStock;