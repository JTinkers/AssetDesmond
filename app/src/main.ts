import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import desmond from './services/desmond';
import stocks from './services/stocks';

// #region configuration
import FinnhubStockProvider from './sources/Finnhub/FinnhubStockProvider';
import FinnhubStockProviderConfig from './sources/Finnhub/FinnhubStockProviderConfig';

const stockProviderConfig = new FinnhubStockProviderConfig({
    apiKey: '<api key>'
});

const stockProvider = new FinnhubStockProvider(stockProviderConfig);
// #endregion

const app = createApp(App).use(store).use(router).use(VueAxios, axios).use(desmond).use(stocks, stockProvider).mount('#app');
app.$stockProvider.fetch(app.$appConfig.symbols);