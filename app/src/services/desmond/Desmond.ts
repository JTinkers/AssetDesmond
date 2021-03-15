import { App, reactive, watch } from 'vue';
import AppConfig from './AppConfig';
import IAppConfig from './interfaces/IAppConfig';
import IDesmond from './interfaces/IDesmond';

class Desmond implements IDesmond {
    public config?: IAppConfig;

    public install(app: App) {
        this.config = reactive(this.initializeConfig());
        
        app.config.globalProperties.$desmond = this;

        watch(this.config, (newValue: IAppConfig) => {
            AppConfig.save(newValue);
        });
    }

    public initializeConfig(): AppConfig {
        let config: IAppConfig = AppConfig.load() ?? new AppConfig();
        config = Object.assign(new AppConfig(), config);

        AppConfig.save(config);

        return config;
    }
}

export default Desmond;