import IStockChartPoint from "./IStockChartPoint";

interface IStock {
    name: string;
    symbol: string;
    price: number;
    chartData: Array<IStockChartPoint>;
    open: number;
    close: number;
    low: number;
    high: number;
}

export default IStock;