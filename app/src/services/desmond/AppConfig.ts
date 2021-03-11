import Theme from './enums/Theme';
import IAppConfig from './interfaces/IAppConfig';

class AppConfig implements IAppConfig {
    public theme = Theme.Light;
    public symbols = ['TSLA', 'MSFT', 'AAPL', 'NIO', 'UXIN']; 

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
}

export default AppConfig;