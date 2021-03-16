import IStockProviderConfig from '@/services/stocks/interfaces/IStockProviderConfig';

class FinnhubStockProviderConfig implements IStockProviderConfig {
    public apiKey: string;
    public useRandomizer?: boolean;
    public refreshRate?: number = 10000;

    constructor(config: FinnhubStockProviderConfig) {
        this.apiKey = config.apiKey;
        this.useRandomizer = config.useRandomizer;
        this.refreshRate = config.refreshRate;
    }
}

export default FinnhubStockProviderConfig;