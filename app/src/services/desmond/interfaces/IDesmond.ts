import { App } from 'vue';
import IAppConfig from './IAppConfig';

interface IDesmond {
    config?: IAppConfig;
    initializeTimestamp: number;
    install(app: App): void;
    initializeConfig(): IAppConfig;
}

export default IDesmond;