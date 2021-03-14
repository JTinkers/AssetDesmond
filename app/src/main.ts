import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';
import store from './store';
import desmond from './services/desmond';
import stocks from './services/stocks';

// #region configuration
import FinnhubStockProvider from './sources/Finnhub/FinnhubStockProvider';
import FinnhubStockProviderConfig from './sources/Finnhub/FinnhubStockProviderConfig';

const stockProviderConfig = new FinnhubStockProviderConfig({
    apiKey: 'c16jign48v6ppg7et00g'
});

const stockProvider = new FinnhubStockProvider(stockProviderConfig);
// #endregion

const app = createApp(App);

const instance = app
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(desmond)
    .use(stocks, stockProvider)
    .use(PrimeVue)
    .mount('#app');

// #region PrimeVue components
import Checkbox from 'primevue/checkbox';

app.component('Checkbox', Checkbox);
// #endregion

// run stock fetching
instance.$stockProvider.fetch(instance.$appConfig.symbols);