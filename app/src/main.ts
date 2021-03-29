import { reactive, createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import store from './store';
import desmond from './services/desmond';
import stocks from './services/stocks';
import App from './App.vue';

import FinnhubStockProvider from './sources/Finnhub/FinnhubStockProvider';

async function setup() {
    const config = (await (await fetch('/finnhub.config.json')).json());
    const stockProvider = reactive(new FinnhubStockProvider(config));

    const instance = createApp(App)
        .use(store)
        .use(router)
        .use(VueAxios, axios)
        .use(desmond)
        .use(stocks, stockProvider)
        .mount('#app');
    
    // run stock fetching
    instance.$stockProvider.fetch(instance.$desmond.config.symbols);
}

setup();