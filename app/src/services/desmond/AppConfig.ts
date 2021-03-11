import IAppConfig from "./interfaces/IAppConfig";

class AppConfig implements IAppConfig {
    public static storageKey = "desmond:app-config"

    public symbols = ['TSLA', 'MSFT', 'AAPL', 'NIO', 'UXIN'];
    public interval = 1000;

    public static save(config: AppConfig): void {
        localStorage.setItem(AppConfig.storageKey, JSON.stringify(config))
    }

    public static load(): AppConfig | null {
        const obj = localStorage.getItem(AppConfig.storageKey)

        if(obj)
            return JSON.parse(obj)

        return null
    }
}

export default AppConfig