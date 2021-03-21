import { reactive, createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import store from './store';
import desmond from './services/desmond';
import stocks from './services/stocks';
import App from './App.vue';

// #region configuration
import FinnhubStockProvider from './sources/Finnhub/FinnhubStockProvider';
import FinnhubStockProviderConfig from './sources/Finnhub/FinnhubStockProviderConfig';

const stockProviderConfig = new FinnhubStockProviderConfig({
    apiKey: 'c1bmdgv48v6sp0s4vj60', // I don't care enough to hide this ;)
    useRandomizer: false,
    refreshRate: 60 * 1000
});

const stockProvider = reactive(new FinnhubStockProvider(stockProviderConfig));
// #endregion

const app = createApp(App);

const instance = app
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(desmond)
    .use(stocks, stockProvider)
    .mount('#app');

// run stock fetching
instance.$stockProvider.fetch(instance.$desmond.config.symbols);