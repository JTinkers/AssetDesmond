import Theme from '../enums/Theme';

interface IAppConfig {
    theme: Theme;
    compact: boolean;
    symbols: string[];
    addSymbol(symbol: string): void;
    removeSymbol(symbol: string): void;
}

export default IAppConfig;