import IStockProviderConfig from '@/services/stocks/interfaces/IStockProviderConfig';

class FinnhubStockProviderConfig implements IStockProviderConfig {
    public apiKey: string;

    constructor(config: FinnhubStockProviderConfig) {
        this.apiKey = config.apiKey;
    }
}

export default FinnhubStockProviderConfig;