import IStockProviderConfig from '@/services/stocks/interfaces/IStockProviderConfig';

class FinnhubStockProviderConfig implements IStockProviderConfig {
    public apiKey: string;
    public useRandomizer?: boolean;

    constructor(config: FinnhubStockProviderConfig) {
        this.apiKey = config.apiKey;
        this.useRandomizer = config.useRandomizer;
    }
}

export default FinnhubStockProviderConfig;