import { reactive, createApp } from 'vue';
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
    apiKey: 'c16jign48v6ppg7et00g', // I don't care enough to hide this ;)
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
    .use(PrimeVue)
    .mount('#app');

// #region PrimeVue components
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Tooltip from 'primevue/tooltip';

app.component('Card', Card);
app.component('Checkbox', Checkbox);
app.directive('tooltip', Tooltip);
// #endregion

// run stock fetching
instance.$stockProvider.fetch(instance.$desmond.config.symbols);