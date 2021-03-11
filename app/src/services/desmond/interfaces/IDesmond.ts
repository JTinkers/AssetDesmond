import { App } from "vue";
import IAppConfig from "./IAppConfig";

interface IDesmond {
    install(app: App): void;
    initializeConfig(): IAppConfig;
}

export default IDesmond