import { App } from 'vue';
import IStockProvider from './interfaces/IStockProvider';

const install = (app: App, stockProvider: IStockProvider): void => {
    app.config.globalProperties.$stockProvider = stockProvider;
};

export default install;