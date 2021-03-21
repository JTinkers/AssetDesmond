import IAppConfig from './interfaces/IAppConfig';

class AppConfig implements IAppConfig {
    public symbols = ['TSLA', 'MSFT', 'AAPL', 'IBM'];
    public compact = false;
    public maxChartYTicks = 120;

    public static storageKey = 'desmond:app-config';

    public static save(config: AppConfig): void {
        localStorage.setItem(AppConfig.storageKey, JSON.stringify(config));
    }

    public static load(): AppConfig | null {
        const obj = localStorage.getItem(AppConfig.storageKey);

        if(obj)
            return JSON.parse(obj);

        return null;
    }

    public addSymbol(symbol: string): void {
        if(!symbol.length)
            return;

        const symbols = this.symbols;
        const stored = symbols?.find(x => x == symbol);

        if(!stored) {
            symbols?.push(symbol);

            AppConfig.save(this);
        }
    }

    public removeSymbol(symbol: string): void {
        const symbols = this.symbols;
        const index = symbols?.indexOf(symbol);

        if(index) {
            symbols?.splice(index, 1);

            AppConfig.save(this);
        }
    }
}

export default AppConfig;