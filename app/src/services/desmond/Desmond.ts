import { App } from 'vue';
import AppConfig from './AppConfig';
import IAppConfig from './interfaces/IAppConfig';
import IDesmond from './interfaces/IDesmond';

class Desmond implements IDesmond {
    public install(app: App) {
        this.initializeConfig();

        app.config.globalProperties.$appConfig = this.initializeConfig();
    }

    public initializeConfig(): AppConfig {
        const config: IAppConfig = AppConfig.load() ?? new AppConfig();

        AppConfig.save(config);

        return config;
    }
}

export default Desmond;