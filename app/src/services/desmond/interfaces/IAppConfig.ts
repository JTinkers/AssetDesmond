interface IAppConfig {
    compact: boolean;
    symbols: string[];
    maxChartYTicks: number;
    addSymbol(symbol: string): void;
    removeSymbol(symbol: string): void;
}

export default IAppConfig;