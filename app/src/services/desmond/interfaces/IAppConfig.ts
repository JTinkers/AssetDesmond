import Theme from '../enums/Theme';

interface IAppConfig {
    theme: Theme;
    symbols: string[];
    addSymbol(symbol: string): void;
    removeSymbol(symbol: string): void;
}

export default IAppConfig;